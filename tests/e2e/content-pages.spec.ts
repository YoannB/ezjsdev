import { expect, test, type Page } from "@playwright/test";
import { PROFILE, PROJECT_SETTINGS } from "../../site/profile";
import { acceptCookiesButton, cookieBanner, languageButton, languageOption } from "./support/home";
import { lp, lpRe } from "./support/locale-path";

// EZJSDEV content pages (spec v0.2 §5.2–§5.6): About, Services, Projects, Contact — translated
// routes (site/config.ts), explorer files (site/explorer.ts), sitemap.xml, language switch,
// contact links, the myKeople figures switch (site/profile.ts) and the 375px layout. Pages are
// opened with an explicit locale prefix (redirected to the canonical URL for the default locale).

const PAGES = [
    { id: "about", fr: { path: "/a-propos", h1: "À propos" }, en: { path: "/about", h1: "About" } },
    { id: "services", fr: { path: "/services", h1: "Services" }, en: { path: "/services", h1: "Services" } },
    { id: "projects", fr: { path: "/projets", h1: "Projets" }, en: { path: "/projects", h1: "Projects" } },
    { id: "contact", fr: { path: "/contact", h1: "Contact" }, en: { path: "/contact", h1: "Contact" } },
] as const;

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    // The cookie banner (present when CI enables ads) must not sit over what we click.
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

const tree = (page: Page) => page.getByRole("tree", { name: "Fichiers du site" });

test.describe("Content pages", () => {
    for (const p of PAGES) {
        for (const locale of ["fr", "en"] as const) {
            const { path, h1 } = p[locale];
            test(`${p.id} answers in ${locale} with its own metadata`, async ({ page }) => {
                const response = await page.goto(`/${locale}${path}`);
                expect(response?.status()).toBe(200);
                await expect(page).toHaveURL(lpRe(locale, path));
                await expect(page.getByRole("heading", { level: 1, name: h1 })).toBeVisible();
                await expect(page).toHaveTitle(new RegExp(h1));
                const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
                expect(canonical).toMatch(new RegExp(`${lp(locale, path).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
                const other = locale === "fr" ? "en" : "fr";
                await expect(page.locator(`link[rel="alternate"][hreflang="${other}"]`)).toHaveAttribute(
                    "href",
                    new RegExp(`${lp(other, PAGES.find((x) => x.id === p.id)![other].path)}$`),
                );
                const description = await page.locator('meta[name="description"]').getAttribute("content");
                expect(description?.length).toBeGreaterThan(50);
            });
        }
    }

    test("the sitemap lists the four pages in every locale", async ({ request }) => {
        const xml = await (await request.get("/sitemap.xml")).text();
        for (const p of PAGES) {
            expect(xml).toContain(`${lp("fr", p.fr.path)}</loc>`);
            expect(xml).toContain(`${lp("en", p.en.path)}</loc>`);
        }
        expect(xml).toContain(`${lp("de", "/ueber-mich")}</loc>`);
        expect(xml).toContain(`${lp("pt", "/contacto")}</loc>`);
    });

    test("the HTML sitemap links to the four pages", async ({ page }) => {
        await page.goto("/fr/plan-du-site");
        const main = page.getByRole("main");
        for (const name of ["À propos", "Services", "Projets", "Contact"]) {
            await expect(main.getByRole("link", { name, exact: true })).toBeVisible();
        }
    });

    test("the language switch keeps the page (translated route)", async ({ page }) => {
        await page.goto("/fr/a-propos");
        await ready(page);
        await languageButton(page).click();
        await languageOption(page, "English").click();
        await expect(page).toHaveURL(lpRe("en", "/about"));
        await expect(page.getByRole("heading", { level: 1, name: "About" })).toBeVisible();

        await page.goto("/fr/projets");
        await ready(page);
        await languageButton(page).click();
        await languageOption(page, "Deutsch").click();
        await expect(page).toHaveURL(lpRe("de", "/projekte"));
        await expect(page.getByRole("heading", { level: 1, name: "Projekte" })).toBeVisible();
    });

    test("LinkedIn comes first, as a safe external link; then the mailto", async ({ page }) => {
        await page.goto("/fr/contact");
        const main = page.getByRole("main");
        const linkedin = main.getByRole("link", { name: /Profil LinkedIn de Yoann Barbier/ });
        await expect(linkedin).toHaveAttribute("href", PROFILE.linkedinUrl);
        await expect(linkedin).toHaveAttribute("target", "_blank");
        const rel = (await linkedin.getAttribute("rel")) ?? "";
        expect(rel.split(/\s+/)).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));

        const mail = main.getByRole("link", { name: PROFILE.email });
        await expect(mail).toHaveAttribute("href", `mailto:${PROFILE.email}`);
        await expect(mail).not.toHaveAttribute("target", /.+/);

        // Order: the LinkedIn section precedes the e-mail one.
        const hrefs = await main
            .locator('a[href^="https://www.linkedin.com"], a[href^="mailto:"]')
            .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
        expect(hrefs).toEqual([PROFILE.linkedinUrl, `mailto:${PROFILE.email}`]);
        // No phone number, no form.
        await expect(main.locator('a[href^="tel:"], form')).toHaveCount(0);
    });

    test("no myKeople figure is published while the switch is off", async ({ page }) => {
        test.skip(PROJECT_SETTINGS.publishFigures, "figures published (site/profile.ts)");
        for (const path of ["/fr/projets", "/en/projects", "/fr/a-propos", "/fr"]) {
            await page.goto(path);
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
            // The whole document (RSC payload included) for the user count, the visible text for the
            // rate. JS `\s` also matches the no-break spaces of the fr/de number formats.
            expect(await page.content()).not.toMatch(/16[\s.,]?000/);
            expect(await page.locator("body").innerText()).not.toMatch(/93\s?%/);
        }
        await page.goto("/fr/projets");
        const mykeople = page.locator('[data-project="mykeople"]');
        await expect(mykeople.getByRole("heading", { level: 2, name: "myKeople" })).toBeVisible();
        await expect(mykeople.getByRole("heading", { name: "Résultat" })).toHaveCount(0);
    });

    test("projects: Axons links to its source and preview, in a new tab", async ({ page }) => {
        await page.goto("/fr/projets");
        const axons = page.locator('[data-project="axons"]');
        for (const href of ["https://github.com/YoannB/axons", "https://axons-preview.netlify.app/fr"]) {
            const link = axons.locator(`a[href="${href}"]`);
            await expect(link).toHaveAttribute("target", "_blank");
            await expect(link).toHaveAttribute("rel", /noopener/);
        }
    });

    test("About carries a ProfilePage / Person JSON-LD with exact facts", async ({ page }) => {
        await page.goto("/fr/a-propos");
        const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
        expect(jsonLd).toMatchObject({
            "@type": "ProfilePage",
            inLanguage: "fr",
            mainEntity: {
                "@type": "Person",
                name: "Yoann Barbier",
                jobTitle: "Lead Full-Stack Senior — React, TypeScript, Node.js",
                sameAs: [PROFILE.linkedinUrl],
                address: { addressLocality: "Nantes", addressCountry: "FR" },
            },
        });
        expect(JSON.stringify(jsonLd)).not.toMatch(/Ex-CTO|telephone|email/);
    });

    test("the home links to Contact, About and the projects", async ({ page }) => {
        await page.goto("/fr");
        await ready(page);
        const main = page.getByRole("main");
        await expect(main.getByRole("link", { name: "Me contacter" })).toHaveAttribute("href", lp("fr", "/contact"));
        await expect(main.getByRole("link", { name: "Mon parcours" })).toBeVisible();
        await expect(main.getByText("myKeople")).toBeVisible();
        await main.getByRole("link", { name: /Voir les projets/ }).click();
        await expect(page).toHaveURL(lpRe("fr", "/projets"));
    });
});

test.describe("Content pages — explorer (desktop)", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("the four pages are files of the explorer; SEO tools stays hidden", async ({ page }) => {
        await page.goto("/fr");
        await ready(page);
        for (const name of ["A-propos", "Services", "Projets", "Contact"]) {
            await expect(tree(page).getByRole("treeitem", { name, exact: true })).toBeVisible();
        }
        await expect(tree(page).getByRole("treeitem", { name: "Nos-Outils-SEO", exact: true })).toHaveCount(0);

        await tree(page)
            .getByRole("treeitem", { name: /^contenu\.md/ })
            .click();
        await expect(page).toHaveURL(lpRe("fr", "/a-propos"));
        await expect(page.getByRole("heading", { level: 1, name: "À propos" })).toBeVisible();
        const tabs = page.getByRole("navigation", { name: "Fichiers ouverts" });
        await expect(tabs.locator('[aria-current="page"]')).toHaveText(/A-propos\/contenu\.md/);
    });

    test("the activity bar opens Contact", async ({ page }) => {
        await page.goto("/fr");
        await ready(page);
        await page.getByRole("navigation", { name: "Barre d'activité" }).getByRole("link", { name: "Contact" }).click();
        await expect(page).toHaveURL(lpRe("fr", "/contact"));
    });
});

test.describe("Content pages — mobile (375px)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    for (const path of ["/a-propos", "/services", "/projets", "/contact"]) {
        test(`no horizontal overflow at 375px: ${path}`, async ({ page }) => {
            await page.goto(`/fr${path}`);
            await ready(page);
            const { scroll, client } = await page.evaluate(() => ({
                scroll: document.documentElement.scrollWidth,
                client: document.documentElement.clientWidth,
            }));
            expect(scroll).toBeLessThanOrEqual(client);
        });
    }
});
