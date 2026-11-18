import { expect, test, type Page } from "@playwright/test";
import { COMMENTS, COMMENTS_ENABLED } from "../../constants/site";
import { blockDisqus } from "./support/disqus";
import { cookieBanner } from "./support/home";
import { lp } from "./support/locale-path";

// Comments under collection entries (docs/articles.md → Comments). Needs a build that saw a
// shortname: CI sets a FAKE NEXT_PUBLIC_DISQUS_SHORTNAME, and every request to Disqus is
// intercepted and aborted (support/disqus.ts), so the specs check what the page TRIES to load.
// ezjsdev: every entry published so far (2013–2017 articles and reminders) is archived
// (collectionDefaults.archiveBefore), so only the archived cases run. When the first non-archived
// entry is published, set ENTRY and OTHER_ENTRY to two of them and the live cases run again.

const ENTRY: string = "";
const OTHER_ENTRY: string = "";
const NO_LIVE_ENTRY = "no non-archived ezjsdev entry yet (all are before archiveBefore): set ENTRY and OTHER_ENTRY";
const ARCHIVED = lp("fr", "/articles/tco-2015-round-2-path-defense");
const ARCHIVED_REMINDER = lp("fr", "/pense-betes/pense-bete-github");

async function open(page: Page, path: string) {
    await page.goto(path);
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
}

const embedUrl = () => `https://${COMMENTS?.shortname}.disqus.com/embed.js`;

test.describe("Comments (Disqus)", () => {
    test.skip(!COMMENTS_ENABLED, "comments off (no SITE.comments, no shortname or no collection with comments)");

    test("the cookie banner offers the comments purpose", async ({ page }) => {
        await blockDisqus(page);
        await open(page, ARCHIVED);
        await expect(cookieBanner(page).locator('[data-purpose="comments"]')).toContainText("Disqus");
    });

    test("non-archived entry: placeholder, nothing from Disqus before the click, a load attempt after", async ({
        page,
    }) => {
        test.skip(!ENTRY, NO_LIVE_ENTRY);
        const attempts = await blockDisqus(page);
        await open(page, ENTRY);
        const comments = page.locator("[data-entry-comments]");
        await expect(comments.getByRole("heading", { name: "Commentaires" })).toBeVisible();
        await expect(comments.locator("[data-comments-gate]")).toContainText("Disqus");
        // Refusing in the banner never blocks reading, and still loads nothing.
        await cookieBanner(page).getByRole("button", { name: "Refuser" }).click();
        await expect(cookieBanner(page)).toBeHidden();
        await page.waitForLoadState("networkidle");
        expect(attempts).toEqual([]);
        await expect(page.locator(".article-body")).toBeVisible();

        await comments.getByRole("button", { name: "Afficher les commentaires", exact: true }).click();
        await expect(comments.locator("[data-comments-gate]")).toHaveCount(0);
        await expect.poll(() => attempts).toContain(embedUrl());
        // This page only: the next entry asks again.
        await open(page, OTHER_ENTRY);
        await expect(page.locator("[data-comments-gate]")).toBeVisible();
    });

    for (const [label, path] of [
        ["article", ARCHIVED],
        ["reminder", ARCHIVED_REMINDER],
    ] as const) {
        test(`an archived ${label} has no comments at all`, async ({ page }) => {
            const attempts = await blockDisqus(page);
            await open(page, path);
            await expect(page.locator(".article__archive-notice")).toBeVisible();
            await expect(page.locator("[data-entry-comments]")).toHaveCount(0);
            await page.waitForLoadState("networkidle");
            expect(attempts).toEqual([]);
        });
    }

    test("consent given in the banner loads the comments without a click", async ({ page }) => {
        test.skip(!ENTRY, NO_LIVE_ENTRY);
        const attempts = await blockDisqus(page);
        await open(page, ENTRY);
        await page.waitForLoadState("networkidle");
        expect(attempts).toEqual([]);
        await cookieBanner(page).getByRole("button", { name: "Accepter" }).click();
        await expect.poll(() => attempts).toContain(embedUrl());
        await expect(page.locator("[data-comments-gate]")).toHaveCount(0);
    });

    test('"Always show comments" grants the purpose for the next entries', async ({ page }) => {
        test.skip(!ENTRY, NO_LIVE_ENTRY);
        const attempts = await blockDisqus(page);
        await open(page, ENTRY);
        // Other purposes refused first: granting comments keeps that refusal.
        await cookieBanner(page).getByRole("button", { name: "Refuser" }).click();
        await page.getByRole("button", { name: "Toujours afficher les commentaires" }).click();
        await expect.poll(() => attempts).toContain(embedUrl());
        const cookies = await page.context().cookies();
        const consent = JSON.parse(decodeURIComponent(cookies.find((c) => c.name === "axons-consent")!.value));
        expect(consent).toMatchObject({ analytics: false, ads: false, comments: true });
        attempts.length = 0;
        await open(page, OTHER_ENTRY);
        await expect(page.locator("[data-comments-gate]")).toHaveCount(0);
        await expect.poll(() => attempts).toContain(embedUrl());
    });
});
