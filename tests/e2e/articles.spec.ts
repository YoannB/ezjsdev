import { expect, test, type Page } from "@playwright/test";
import { ARTICLES_ENABLED } from "../../constants/site";
import { acceptCookiesButton, cookieBanner, languageButton, languageOption } from "./support/home";
import { lp, lpRe } from "./support/locale-path";

// Articles: listing -> article -> language switch onto the TRANSLATED slug, SEO tags, sitemap and
// the home "latest articles" block. Relies on the two most recent EZJSDEV articles (content/articles/,
// translated in every supported locale): tco-2015-round-3-peg-jump (2015-07-22) and
// tco-2015-round-2-path-defense (2015-07-20); material-design carries the GFM table.

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    // The cookie banner (present when CI enables ads) must not sit over the links we click.
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

test.describe("Articles", () => {
    // A derived site that turned the section off (site/config.ts) has nothing to check here.
    test.skip(!ARTICLES_ENABLED, "articles section disabled (ARTICLES_ENABLED = false)");

    test("list -> article -> language switch on the translated slug", async ({ page }) => {
        await page.goto("/fr/articles");
        await ready(page);
        await expect(page.getByRole("heading", { level: 1, name: "Articles" })).toBeVisible();
        // Newest first.
        const titles = page.locator(".article-feed .article-teaser__title");
        await expect(titles).toHaveCount(15);
        await expect(titles.nth(0)).toHaveText("TCO 2015 - Round 3 - PegJump");
        await expect(titles.nth(1)).toHaveText("TCO 2015 - Round 2 - PathDefense");

        await titles.first().getByRole("link").click();
        await expect(page).toHaveURL(lpRe("fr", "/articles/tco-2015-round-3-peg-jump"));
        await expect(page.getByRole("heading", { level: 1, name: "TCO 2015 - Round 3 - PegJump" })).toBeVisible();
        await expect(page.locator(".article-body img").first()).toHaveAttribute(
            "src",
            "/articles/tco-2015-round-3-peg-jump/pegjump-seed1-init.png",
        );

        await languageButton(page).click();
        await languageOption(page, "Deutsch").click();
        await expect(page).toHaveURL(lpRe("de", "/artikel/tco-2015-runde-3-peg-jump"));
        await expect(page.getByRole("heading", { level: 1, name: "TCO 2015 - Runde 3 - PegJump" })).toBeVisible();
    });

    test("Markdown is rendered as elements: GFM table and fenced code", async ({ page }) => {
        await page.goto("/fr/articles/page-simple-material-design");
        await expect(page.locator(".article-body table")).toBeVisible();
        await expect(page.locator(".article-body table")).toContainText("#3f51b5");
        await expect(page.locator(".article-body pre code").first()).toContainText("material-design.min.css");
    });

    test("canonical, hreflang and JSON-LD of the article page", async ({ page }) => {
        await page.goto("/fr/articles/tco-2015-round-2-path-defense");
        const canonical = page.locator('link[rel="canonical"]');
        await expect(canonical).toHaveAttribute(
            "href",
            new RegExp(`${lp("fr", "/articles/tco-2015-round-2-path-defense")}$`),
        );
        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
            "href",
            new RegExp(`${lp("en", "/articles/tco-2015-round-2-path-defense")}$`),
        );
        await expect(page.locator('link[rel="alternate"][hreflang="pt"]')).toHaveAttribute(
            "href",
            new RegExp(`${lp("pt", "/artigos/tco-2015-rodada-2-path-defense")}$`),
        );
        const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
        expect(jsonLd).toMatchObject({ "@type": "BlogPosting", inLanguage: "fr", datePublished: "2015-07-20" });
    });

    test("a slug from another language leads to the 404 page, not indexable", async ({ page }) => {
        // Soft 404: app/[locale]/loading.tsx starts streaming before notFound() runs, so Next keeps
        // the 200 status and adds robots noindex (same behavior as every page under [locale]).
        await page.goto("/fr/articles/tco-2015-ronda-2-path-defense");
        await expect(page.getByRole("heading", { level: 1, name: "404" })).toBeVisible();
        await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
        await expect(page.getByText("Nous avons fouillé tout le multivers")).toBeVisible();
        await page.getByRole("link", { name: "Retour à l'accueil" }).click();
        await expect(page).toHaveURL(lpRe("fr"));
    });

    test("home shows the latest articles with a link to the list", async ({ page }) => {
        await page.goto("/fr");
        await ready(page);
        const block = page.locator("#latest-articles");
        await expect(block.getByRole("heading", { level: 2, name: "Derniers articles" })).toBeVisible();
        await expect(block.locator(".article-teaser")).toHaveCount(3);
        await block.getByRole("link", { name: /Tous les articles/ }).click();
        await expect(page).toHaveURL(lpRe("fr", "/articles"));
    });

    test("the sitemap lists every article translation", async ({ request }) => {
        const xml = await (await request.get("/sitemap.xml")).text();
        expect(xml).toContain(`${lp("fr", "/articles/tco-2015-round-3-peg-jump")}</loc>`);
        expect(xml).toContain(`${lp("en", "/articles/tco-2015-round-3-peg-jump")}</loc>`);
        expect(xml).toContain(`${lp("es", "/articulos/tco-2015-ronda-3-peg-jump")}</loc>`);
        expect(xml).toContain(`${lp("de", "/artikel")}</loc>`);
    });
});
