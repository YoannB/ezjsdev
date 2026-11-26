import { expect, test, type Page } from "@playwright/test";
import { blockDisqus } from "./support/disqus";
import { COLLECTION_DEFAULTS } from "../../constants/site";
import { entryStatus, resolveRules } from "../../lib/articles/status";
import { dayIn } from "../../lib/day";
import { acceptCookiesButton, cookieBanner } from "./support/home";

// EZJSDEV archive rules (constants/site.ts → collectionDefaults: { newForDays: 90, archiveBefore:
// "2018-01-01" }): every migrated article (2013–2015) and reminder (2013–2017) is an archive, never
// "New", and the reminders home block is titled as archives. The neural-network-js article
// (2026-11-25) is the only non-archived entry: "New" for 90 days, then no badge at all. Whether it is
// still new is computed with the site's own rule and "today" in the site's time zone (i18n/request.ts
// → timeZone), so the spec keeps passing once the window closes.
const LIVE_ARTICLE = { date: "2026-11-25", title: "Un réseau de neurones en JavaScript, pas à pas" };
const liveIsNew = () =>
    entryStatus(LIVE_ARTICLE, resolveRules({}, COLLECTION_DEFAULTS), dayIn(Date.now(), "Europe/Paris")).isNew;

const at = (locale: string, path = "") => `/${locale}${path}`;

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

test.describe("Archive badges", () => {
    // "Accept" also grants the comments purpose: never reach Disqus from a spec (comments.spec.ts).
    test.beforeEach(async ({ page }) => {
        await blockDisqus(page);
    });
    test("every migrated article is an archive; the live one is not, and is new within its window", async ({
        page,
    }) => {
        await page.goto(at("fr", "/articles"));
        await ready(page);
        const cards = page.locator(".article-feed .article-teaser");
        await expect(cards).toHaveCount(16);
        await expect(page.locator(".article-feed .entry-badge--archive")).toHaveCount(15);
        const live = cards.filter({ hasText: LIVE_ARTICLE.title });
        await expect(live).toHaveCount(1);
        await expect(live.locator(".entry-badge--archive")).toHaveCount(0);
        const isNew = liveIsNew();
        await expect(live.locator(".entry-badge--new")).toHaveCount(isNew ? 1 : 0);
        // No archive is ever new: the live card is the only one that can carry the badge.
        await expect(page.locator(".article-feed .entry-badge--new")).toHaveCount(isNew ? 1 : 0);
    });

    test("an archived reminder page shows the badge and the notice", async ({ page }) => {
        await page.goto(at("fr", "/pense-betes/installation-de-node-js"));
        await ready(page);
        await expect(page.locator(".article__meta .entry-badge--archive")).toHaveText("Archive");
        await expect(page.locator(".article__archive-notice")).toBeVisible();
    });

    test("the home blocks: latest articles (the live one), reminders titled as archives", async ({ page }) => {
        await page.goto(at("fr"));
        await ready(page);
        await expect(
            page.locator("#latest-articles").getByRole("heading", { level: 2, name: "Derniers articles" }),
        ).toBeVisible();
        await expect(page.locator("#latest-articles .entry-badge--archive")).toHaveCount(0);
        await expect(
            page.locator("#latest-reminders").getByRole("heading", { level: 2, name: "Pense-bêtes (archives)" }),
        ).toBeVisible();
        await expect(page.getByRole("heading", { name: /Articles \(archives\)|Derniers pense-bêtes/ })).toHaveCount(0);
    });
});
