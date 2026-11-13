import { expect, test, type Page } from "@playwright/test";
import { getCollection } from "../../constants/site";
import { acceptCookiesButton, cookieBanner, languageButton, languageOption } from "./support/home";
import { DEFAULT_LOCALE, lp, lpRe } from "./support/locale-path";

// EZJSDEV "pense-bêtes" (reminders collection, site/config.ts): listing, highlighted code, language
// switch onto the TRANSLATED slug, soft 404, sitemap.xml and nav entry. Relies on the 14 reminders
// migrated from the old site (content/reminders/), translated in every supported locale; the newest
// is babel (2017-01-05), then bower (2015-03-30).

const ENABLED = getCollection("reminders").enabled;

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    // The cookie banner (present when CI enables ads) must not sit over the links we click.
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

test.describe("Reminders", () => {
    test.skip(!ENABLED, "reminders collection disabled (site/config.ts)");

    test("the listing shows every reminder, newest first", async ({ page }) => {
        await page.goto(lp("fr", "/pense-betes"));
        await ready(page);
        await expect(page.getByRole("heading", { level: 1, name: "Pense-bêtes" })).toBeVisible();
        const titles = page.locator(".article-feed .article-teaser__title");
        await expect(titles).toHaveCount(14);
        await expect(titles.nth(0)).toHaveText("Commencer l'ES6 avec Babel");
        await expect(titles.nth(1)).toHaveText("Créer un package bower");

        await titles.nth(1).getByRole("link").click();
        await expect(page).toHaveURL(lpRe("fr", "/pense-betes/creer-un-package-bower"));
        await expect(page.getByRole("heading", { level: 1, name: "Créer un package bower" })).toBeVisible();
    });

    test("an entry renders its code highlighted on the server", async ({ page }) => {
        await page.goto(lp("fr", "/pense-betes/creer-un-package-bower"));
        const json = page.locator(".article-body pre code.language-json");
        await expect(json).toContainText('"devDependencies"');
        await expect(json.locator(".hljs-attr").first()).toBeVisible();
        await expect(page.locator(".article-body pre code.language-bash").first()).toContainText("bower init");
        const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
        expect(jsonLd).toMatchObject({ "@type": "TechArticle", inLanguage: "fr", datePublished: "2015-03-30" });
    });

    test("the language switch lands on the translated slug", async ({ page }) => {
        await page.goto(lp("fr", "/pense-betes/pense-bete-github"));
        await ready(page);
        await expect(page.getByRole("heading", { level: 1, name: "Pense-bête GitHub" })).toBeVisible();
        await languageButton(page).click();
        await languageOption(page, "Deutsch").click();
        await expect(page).toHaveURL(lpRe("de", "/merkzettel/github-merkzettel"));
        await expect(page.getByRole("heading", { level: 1, name: "GitHub-Merkzettel" })).toBeVisible();
    });

    test("a slug from another language leads to the 404 page, not indexable", async ({ page }) => {
        // Soft 404 (HTTP 200 + robots noindex), as for the articles: see docs/articles.md.
        await page.goto(lp("fr", "/pense-betes/github-cheat-sheet"));
        await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
        await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
    });

    test("the sitemap lists every reminder translation", async ({ request }) => {
        const xml = await (await request.get("/sitemap.xml")).text();
        expect(xml).toContain(`${lp("fr", "/pense-betes/pense-bete-github")}</loc>`);
        expect(xml).toContain(`${lp("en", "/reminders/github-cheat-sheet")}</loc>`);
        expect(xml).toContain(`${lp("pt", "/lembretes/lembrete-github")}</loc>`);
        expect(xml).toContain(`${lp("de", "/merkzettel")}</loc>`);
    });

    test("the footer nav links to the listing", async ({ page }) => {
        await page.goto(lp("en"));
        await ready(page);
        await page.getByRole("contentinfo").getByRole("link", { name: "Reminders", exact: true }).click();
        await expect(page).toHaveURL(lpRe("en", "/reminders"));
        await expect(page.getByRole("heading", { level: 1, name: "Reminders" })).toBeVisible();
    });

    test("an article links to the localized reminder", async ({ page }) => {
        // The Markdown links are written for the production default locale (fr, no prefix).
        test.skip(DEFAULT_LOCALE !== "fr", "article links assume NEXT_PUBLIC_DEFAULT_LOCALE=fr");
        await page.goto(lp("fr", "/articles/blog-pour-github"));
        await ready(page);
        await page.locator(".article-body").getByRole("link", { name: "pense-bête" }).click();
        await expect(page).toHaveURL(lpRe("fr", "/pense-betes/pense-bete-github"));
        await expect(page.getByRole("heading", { level: 1, name: "Pense-bête GitHub" })).toBeVisible();
    });
});
