import { expect, test, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner } from "./support/home";

// EZJSDEV "Generate an SEO site" demo (components/site/demo/*, spec v0.2 §7): a SCRIPTED simulation
// in the IDE terminal, then a result card presenting the Axons preview. No network beyond the local
// thumbnail, no /api/ call. Pages are opened with an explicit "/fr" prefix so labels are known.
const AXONS = "https://axons-preview.netlify.app/fr";
const LINES = 8;

async function ready(page: Page, path = "/fr") {
    await page.goto(path);
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

const homeButton = (page: Page) => page.getByRole("main").locator(".ez-home__action--demo");
const terminalButton = (page: Page) => page.locator("#ide-terminal .ide-panel__action");
const demoLog = (page: Page) => page.getByRole("region", { name: "Démonstration : génération d'un site SEO" });
const card = (page: Page) => page.getByRole("article", { name: "Exemple de résultat : Axons" });
const cardTitle = (page: Page) => page.getByRole("heading", { name: "Exemple de résultat : Axons" });
const lines = (page: Page) => demoLog(page).locator(".terminal__line");

test.describe("SEO site demo — desktop", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("click → scripted sequence → result card with the Axons preview link", async ({ page }) => {
        await ready(page);
        const button = homeButton(page);
        await expect(button).toHaveText("Générer un site SEO");
        await expect(page.getByText("Démonstration simulée dans le terminal")).toBeVisible();
        await button.click();

        // Announced once at the start (status region), never line by line (the log is not live).
        await expect(page.getByRole("status").filter({ hasText: "Démonstration lancée" })).toBeAttached();
        await expect(demoLog(page)).not.toHaveAttribute("aria-live", /.+/);
        await expect(lines(page).first()).toHaveText(/Démonstration : simulation du processus de création/);
        await expect(card(page)).toBeHidden();

        await expect(lines(page)).toHaveCount(LINES);
        await expect(lines(page).nth(4)).toHaveText(/Optimisation SEO : meta, sitemap, robots\.txt/);
        await expect(card(page)).toBeVisible();
        await expect(cardTitle(page)).toBeFocused();
        await expect(page.getByRole("status").filter({ hasText: "Démonstration terminée" })).toBeAttached();

        const open = card(page).getByRole("link", { name: /Ouvrir le site/ });
        await expect(open).toHaveAttribute("href", AXONS);
        await expect(open).toHaveAttribute("target", "_blank");
        await expect(open).toHaveAttribute("rel", "noopener noreferrer");
        await expect(card(page).getByText(AXONS, { exact: true })).toBeVisible();
        const img = card(page).getByRole("img");
        await expect(img).toHaveAttribute("src", /\/demo\/axons-preview-fr-(dark|light)\.webp$/);
        await expect(img).toHaveAttribute("width", "640");
        await expect(img).toHaveAttribute("height", "400");
        expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBe(640);
        // No unverified metric, no fake deployment.
        await expect(page.locator("#ide-terminal")).not.toContainText(
            /\d\s?(Mo|MB)|pages créées|Déploiement sur Netlify/,
        );
    });

    test("the button is disabled while running (no double launch), then replays", async ({ page }) => {
        await ready(page);
        await homeButton(page).click();
        await expect(homeButton(page)).toHaveAttribute("aria-disabled", "true");
        await expect(homeButton(page)).toHaveText("Démonstration en cours…");
        await expect(terminalButton(page)).toHaveAttribute("aria-disabled", "true");
        await expect(lines(page).nth(1)).toBeVisible();
        const before = await lines(page).count();
        await homeButton(page).click({ force: true }); // aria-disabled: ignored, no restart
        expect(await lines(page).count()).toBeGreaterThanOrEqual(before);
        await expect(card(page)).toBeVisible();
        await expect(homeButton(page)).not.toHaveAttribute("aria-disabled");

        // Replay from the terminal bar: a fresh run, the card comes back at the end.
        await expect(terminalButton(page)).toHaveText("Rejouer");
        await terminalButton(page).click();
        await expect(card(page)).toBeHidden();
        await expect(lines(page)).not.toHaveCount(LINES);
        await expect(card(page)).toBeVisible();
        await expect(cardTitle(page)).toBeFocused();
        await expect(homeButton(page)).toHaveText("Rejouer la démonstration");
    });

    test("no external request and no /api/ call during the demo", async ({ page }) => {
        await ready(page);
        const requests: string[] = [];
        page.on("request", (r) => requests.push(r.url()));
        await homeButton(page).click();
        await expect(card(page)).toBeVisible();
        await page.waitForTimeout(300);
        const origin = new URL(page.url()).origin;
        expect(requests.filter((u) => !u.startsWith(origin))).toEqual([]);
        expect(requests.filter((u) => new URL(u).pathname.startsWith("/api/"))).toEqual([]);
        // The only asset fetched for the demo is the local thumbnail.
        expect(requests.filter((u) => /\.(webp|png|jpe?g|avif)(\?|$)/.test(u)).map((u) => new URL(u).pathname)).toEqual(
            expect.arrayContaining([expect.stringMatching(/^\/demo\/axons-preview-fr-(dark|light)\.webp$/)]),
        );
    });

    test("prefers-reduced-motion: the whole sequence and the result almost at once", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await ready(page);
        await homeButton(page).click();
        await expect(lines(page)).toHaveCount(LINES, { timeout: 500 });
        await expect(card(page)).toBeVisible({ timeout: 500 });
        await expect(cardTitle(page)).toBeFocused();
    });

    test("thumbnail failure: a clean fallback, the link stays usable", async ({ page }) => {
        await page.route("**/demo/*.webp", (route) => route.abort());
        await ready(page);
        await homeButton(page).click();
        await expect(card(page)).toBeVisible();
        await expect(card(page).getByText("Aperçu indisponible")).toBeVisible();
        await expect(card(page).getByRole("img")).toHaveCount(0);
        await expect(card(page).getByRole("link", { name: /Ouvrir le site/ })).toHaveAttribute("href", AXONS);
    });

    test("navigating away cancels the run; the terminal shows the page status again", async ({ page }) => {
        await ready(page);
        await homeButton(page).click();
        await expect(lines(page).nth(1)).toBeVisible();
        await expect(homeButton(page)).toHaveAttribute("aria-disabled", "true"); // still running
        await page.getByRole("contentinfo").getByRole("link", { name: "Plan du site" }).click();
        await expect(page).toHaveURL(/plan-du-site/);
        await expect(demoLog(page)).toHaveCount(0);
        await expect(page.locator("#ide-terminal")).toContainText("open Plan-du-site/page.tsx");
        await page.goBack();
        await expect(homeButton(page)).toHaveText("Générer un site SEO");
        await expect(demoLog(page)).toHaveCount(0);
    });
});

test.describe("SEO site demo — mobile (375px)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("the collapsed terminal opens, the card fits in one column without overflow", async ({ page }) => {
        await ready(page);
        const toggle = page.getByRole("button", { name: "Afficher le terminal" });
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await homeButton(page).click();
        await expect(page.getByRole("button", { name: "Masquer le terminal" })).toHaveAttribute(
            "aria-expanded",
            "true",
        );
        await expect(demoLog(page)).toBeVisible();
        await expect(card(page)).toBeVisible();
        await expect(cardTitle(page)).toBeFocused();
        await expect(cardTitle(page)).toBeInViewport();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
        // One column: the thumbnail sits above the text.
        const img = await card(page).getByRole("img").boundingBox();
        const title = await cardTitle(page).boundingBox();
        expect(img && title && img.y + img.height <= title.y).toBe(true);
    });
});
