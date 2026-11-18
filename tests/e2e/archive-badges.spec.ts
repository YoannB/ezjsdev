import { expect, test, type Page } from "@playwright/test";
import { blockDisqus } from "./support/disqus";
import { acceptCookiesButton, cookieBanner } from "./support/home";

// EZJSDEV archive rules (site/config.ts → collectionDefaults: { newForDays: 90, archiveBefore:
// "2018-01-01" }): every migrated article (2013–2015) and reminder (2013–2017) is an archive, none
// is "New", and the home blocks are titled as archives instead of "latest". A future entry (dated
// within 90 days) will carry "New": covered by Axons' unit tests (lib/articles/status.ts).

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
    test("every article card is an archive, none is new", async ({ page }) => {
        await page.goto(at("fr", "/articles"));
        await ready(page);
        const cards = page.locator(".article-feed .article-teaser");
        await expect(cards).toHaveCount(15);
        await expect(page.locator(".article-feed .entry-badge--archive")).toHaveCount(15);
        await expect(page.locator(".article-feed .entry-badge--new")).toHaveCount(0);
    });

    test("an archived reminder page shows the badge and the notice", async ({ page }) => {
        await page.goto(at("fr", "/pense-betes/installation-de-node-js"));
        await ready(page);
        await expect(page.locator(".article__meta .entry-badge--archive")).toHaveText("Archive");
        await expect(page.locator(".article__archive-notice")).toBeVisible();
    });

    test("the home blocks are titled as archives, not as latest", async ({ page }) => {
        await page.goto(at("fr"));
        await ready(page);
        await expect(
            page.locator("#latest-articles").getByRole("heading", { level: 2, name: "Articles (archives)" }),
        ).toBeVisible();
        await expect(
            page.locator("#latest-reminders").getByRole("heading", { level: 2, name: "Pense-bêtes (archives)" }),
        ).toBeVisible();
        await expect(page.getByRole("heading", { name: /Derniers (articles|pense-bêtes)/ })).toHaveCount(0);
    });
});
