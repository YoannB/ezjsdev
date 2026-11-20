import { expect, test, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner } from "./support/home";
import { lp } from "./support/locale-path";

// EZJSDEV shell chrome after the UI feedback: no line numbers in the reading zone, the explorer
// switch of the activity bar, the title-bar logo's light sweep (components/ui/Logo.tsx + styles/ui/logo.css) and Axons'
// Button on the home, the demo and the contact page. Explicit "/fr" prefix so labels are known.

async function ready(page: Page, path = "/fr") {
    await page.goto(path);
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

const explorer = (page: Page) => page.getByRole("complementary", { name: "Explorateur" });
const activityNav = (page: Page) => page.getByRole("navigation", { name: "Barre d'activité" });
const explorerSwitch = (page: Page) => page.locator(".ide-activity__toggle");

// Computed animation names of the three glyphs of a logo (they never animate). `scope` is the
// logo's container: the title bar (.ide-brand) or the pre-hydration splash (.splash-logo, the real
// Logo rendered by Axons through SITE.splash.logo).
const glyphAnimations = (page: Page, scope = ".ide-brand") =>
    page.locator(`${scope} .logo__glyph`).evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
// The light sweep of a logo (components/ui/Logo.tsx .logo__sheen, styles/ui/logo.css).
const sheen = (page: Page, scope = ".ide-brand") =>
    page.locator(`${scope} .logo__sheen`).evaluate((el) => {
        const s = getComputedStyle(el);
        return { name: s.animationName, iterations: s.animationIterationCount, transform: s.transform };
    });
// Position and transform of the three glyphs: must stay identical while the sweep runs.
const glyphGeometry = (page: Page, scope = ".ide-brand") =>
    page.locator(`${scope} .logo__glyph`).evaluateAll((els) =>
        els.map((el) => {
            const r = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            return [r.x, r.y, r.width, r.height, s.transform, s.strokeDasharray, s.strokeDashoffset].join("|");
        }),
    );
// The whole splash logo (Axons breathes it with logoBreath; ezjsdev keeps it still) and the former
// CSS-mask workaround (#app-splash::before), which must stay gone.
const splashLogo = (page: Page) =>
    page.locator("#app-splash svg.splash-logo").evaluate((el) => {
        const s = getComputedStyle(el);
        const before = getComputedStyle(el.closest("#app-splash")!, "::before");
        return { animationName: s.animationName, transform: s.transform, beforeContent: before.content };
    });

test.describe("IDE chrome — desktop", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("the reading zone has no line numbers", async ({ page }) => {
        for (const path of ["/fr", "/fr/mentions-legales", "/fr/contact"]) {
            await ready(page, path);
            // No generated counter on any block (the former gutter: `content: counter(ide-line) / ""`).
            const counters = await page
                .locator("#main :is(h1, h2, h3, p, li, pre, blockquote, table)")
                .evaluateAll((els) =>
                    els
                        .filter((el) => /counter|\d/.test(getComputedStyle(el, "::before").content))
                        .map((el) => el.tagName),
                );
            expect(counters, path).toEqual([]);
            // No gutter reserved on the left of the page body.
            const gutters = await page
                .locator("#main :is(.static-page__card, .ez-home__doc)")
                .evaluateAll((els) => els.map((el) => getComputedStyle(el).paddingLeft));
            expect(gutters.length, path).toBeGreaterThan(0);
            expect(
                gutters.every((p) => p === "0px"),
                path,
            ).toBe(true);
        }
    });

    test("the explorer switch: state, aria-expanded/controls, label, apart from the nav links", async ({ page }) => {
        await ready(page);
        const toggle = explorerSwitch(page);
        await expect(toggle).toHaveJSProperty("tagName", "BUTTON");
        await expect(toggle).toHaveAttribute("aria-controls", "ide-explorer");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(toggle).toHaveAccessibleName("Masquer l'explorateur");
        await expect(explorer(page)).toBeVisible();
        // A switch, not a navigation entry: the nav holds links only, the switch sits outside it.
        await expect(activityNav(page).getByRole("button")).toHaveCount(0);
        await expect(activityNav(page).locator(".ide-activity__toggle")).toHaveCount(0);
        await expect(activityNav(page).getByRole("link", { name: "Articles" })).toBeVisible();

        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(toggle).toHaveAccessibleName("Afficher l'explorateur");
        await expect(explorer(page)).toBeHidden();

        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(explorer(page)).toBeVisible();
    });

    test("the explorer switch works with the keyboard and keeps the focus", async ({ page }) => {
        await ready(page);
        const toggle = explorerSwitch(page);
        await toggle.focus();
        await page.keyboard.press("Enter");
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(explorer(page)).toBeHidden();
        await expect(toggle).toBeFocused();
        await page.keyboard.press("Space");
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        await expect(explorer(page)).toBeVisible();
        await expect(toggle).toBeFocused();
        // Next tab stop: the first navigation link of the activity bar.
        await page.keyboard.press("Tab");
        await expect(activityNav(page).getByRole("link").first()).toBeFocused();
    });

    test("the title-bar logo is Axons' Logo, swept by a light without hover, glyph still", async ({ page }) => {
        await ready(page);
        const logo = page.locator(".ide-brand svg.logo");
        await expect(logo).toHaveAttribute("role", "img");
        await expect(logo).toHaveAttribute("aria-label", "ezjsdev");
        // Pointer away from the brand: the sweep loops on its own, never a one-shot.
        await page.mouse.move(700, 600);
        // The former motion (brackets breathing, slash redrawing) is gone: no glyph animates.
        expect(await glyphAnimations(page)).toEqual(["none", "none", "none"]);
        const band = await sheen(page);
        expect(band.name).toBe("ezLogoSheen");
        expect(band.iterations).toBe("infinite");
        // The band really travels while the three glyphs keep the same place and transform.
        const before = await glyphGeometry(page);
        expect(before.every((g) => g.endsWith("|none|none|0px"))).toBe(true);
        const seen = new Set<string>();
        for (let i = 0; i < 12; i++) {
            seen.add((await sheen(page)).transform);
            expect(await glyphGeometry(page)).toEqual(before);
            await page.waitForTimeout(150);
        }
        expect(seen.size).toBeGreaterThan(1);
        // Hovering changes nothing (no restarted or extra animation).
        await logo.hover();
        expect(await glyphAnimations(page)).toEqual(["none", "none", "none"]);
        expect((await sheen(page)).name).toBe("ezLogoSheen");
    });

    test("the home and contact actions are Axons Buttons (links stay links)", async ({ page }) => {
        await ready(page);
        const main = page.getByRole("main");
        const contact = main.getByRole("link", { name: "Me contacter" });
        await expect(contact).toHaveAttribute("href", lp("fr", "/contact"));
        await expect(contact).toHaveClass(/MuiButton-root/);
        await expect(contact).toHaveClass(/MuiButton-contained/);
        const about = main.getByRole("link", { name: "Mon parcours" });
        await expect(about).toHaveClass(/MuiButton-outlined/);
        const demo = main.getByRole("button", { name: "Générer un site" });
        await expect(demo).toHaveClass(/MuiButton-root/);
        // No <button> nested in a link (or the reverse).
        expect(await page.locator("a button, button a").count()).toBe(0);
    });
});

test.describe("IDE chrome — pre-hydration splash", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("the splash shows the real logo, still, swept by the same light, above the bar", async ({ page }) => {
        await page.goto("/fr");
        const splash = page.locator("#app-splash");
        await expect(splash.locator("svg.splash-logo")).toHaveCount(1);
        await expect(splash.locator(".loader__bar")).toHaveCount(1);
        // The logo comes before the bar (grid rows: logo, then bar).
        expect(await splash.evaluate((el) => [...el.children].map((c) => c.getAttribute("class")))).toEqual([
            "logo splash-logo",
            "loader__bar",
        ]);
        const logo = await splashLogo(page);
        // No CSS redraw of the mark any more, and no breathing scale on the whole logo.
        expect(["none", "normal"]).toContain(logo.beforeContent);
        expect(logo.animationName).toBe("none");
        expect(logo.transform).toBe("none");
        expect(await glyphAnimations(page, ".splash-logo")).toEqual(["none", "none", "none"]);
        const band = await sheen(page, ".splash-logo");
        expect(band.name).toBe("ezLogoSheen");
        expect(band.iterations).toBe("infinite");
    });

    test.describe("before hydration (JS disabled: the splash stays on screen)", () => {
        test.use({ javaScriptEnabled: false });

        test("only the sweep band moves; the three strokes keep their place", async ({ page }) => {
            await page.goto("/fr");
            await expect(page.locator("#app-splash svg.splash-logo")).toBeVisible();
            const before = await glyphGeometry(page, ".splash-logo");
            expect(before).toHaveLength(3);
            expect(before.every((g) => g.endsWith("|none|none|0px"))).toBe(true);
            const seen = new Set<string>();
            for (let i = 0; i < 12; i++) {
                seen.add((await sheen(page, ".splash-logo")).transform);
                expect(await glyphGeometry(page, ".splash-logo")).toEqual(before);
                await page.waitForTimeout(150);
            }
            expect(seen.size).toBeGreaterThan(1);
        });
    });
});

test.describe("IDE chrome — reduced motion", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("the title-bar and splash logos are static under prefers-reduced-motion", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await ready(page);
        expect(await glyphAnimations(page)).toEqual(["none", "none", "none"]);
        expect((await sheen(page)).name).toBe("none");
        expect((await sheen(page, ".splash-logo")).name).toBe("none");
        expect((await splashLogo(page)).animationName).toBe("none");
        // No sweep left on the mark: the band stays parked outside it (--ez-sheen = 0).
        expect((await sheen(page)).transform).toBe("matrix(1, 0, 0, 1, 0, 0)");
    });
});

test.describe("IDE chrome — mobile (375px)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("the activity bar is hidden; the title-bar switch opens and closes the drawer", async ({ page }) => {
        await ready(page);
        await expect(explorerSwitch(page)).toBeHidden();
        const burger = page.locator(".ide-titlebar__menu");
        await expect(burger).toHaveAttribute("aria-controls", "ide-explorer");
        await expect(burger).toHaveAttribute("aria-expanded", "false");
        await expect(burger).toHaveAccessibleName("Ouvrir l'explorateur");
        await burger.click();
        await expect(burger).toHaveAttribute("aria-expanded", "true");
        await expect(burger).toHaveAccessibleName("Fermer l'explorateur");
        await expect(explorer(page)).toBeVisible();
        await burger.click();
        await expect(burger).toHaveAttribute("aria-expanded", "false");
        await expect(explorer(page)).toBeHidden();
        // The sweep runs on mobile too.
        expect((await sheen(page)).name).toBe("ezLogoSheen");
    });
});
