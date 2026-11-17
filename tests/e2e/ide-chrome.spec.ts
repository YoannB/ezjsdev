import { expect, test, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner } from "./support/home";
import { lp } from "./support/locale-path";

// EZJSDEV shell chrome after the UI feedback: no line numbers in the reading zone, the explorer
// switch of the activity bar, the animated title-bar logo (Axons' Logo + site/theme.css) and Axons'
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

// Computed animation names of the three glyphs of the title-bar logo.
const brandAnimations = (page: Page) =>
    page.locator(".ide-brand .logo__glyph").evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
const brandIterations = (page: Page) =>
    page
        .locator(".ide-brand .logo__glyph")
        .evaluateAll((els) => els.map((el) => getComputedStyle(el).animationIterationCount));
// Computed animation of the splash mark (#app-splash::before, site/theme.css). The node is never
// removed (only hidden by .is-leaving), so its style stays measurable after hydration.
const splashMark = (page: Page) =>
    page.locator("#app-splash").evaluate((el) => {
        const s = getComputedStyle(el, "::before");
        return { content: s.content, width: s.width, animationName: s.animationName, mask: s.maskImage };
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

    test("the title-bar logo is Axons' Logo, looping the loader's animation without hover", async ({ page }) => {
        await ready(page);
        const logo = page.locator(".ide-brand svg.logo");
        await expect(logo).toHaveAttribute("role", "img");
        await expect(logo).toHaveAttribute("aria-label", "ezjsdev");
        // Pointer away from the brand: the loop runs on its own, never a one-shot.
        await page.mouse.move(700, 600);
        expect(await brandAnimations(page)).toEqual(["ezBracketLeft", "ezSlashDraw", "ezBracketRight"]);
        expect(await brandIterations(page)).toEqual(["infinite", "infinite", "infinite"]);
        // Hovering changes nothing (no restarted animation).
        await logo.hover();
        expect(await brandAnimations(page)).toEqual(["ezBracketLeft", "ezSlashDraw", "ezBracketRight"]);
    });

    test("the splash shows the animated mark above the progress bar", async ({ page }) => {
        await ready(page);
        await expect(page.locator("#app-splash .loader__bar")).toHaveCount(1);
        const mark = await splashMark(page);
        expect(mark.content).toBe('""');
        expect(mark.width).toBe("120px");
        expect(mark.mask).toContain("data:image/svg+xml");
        expect(mark.animationName).toBe("ezSplashBrackets, logoBreath");
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

test.describe("IDE chrome — reduced motion", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("the title-bar logo and the splash mark are static under prefers-reduced-motion", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await ready(page);
        expect(await brandAnimations(page)).toEqual(["none", "none", "none"]);
        expect((await splashMark(page)).animationName).toBe("none");
        // Fully drawn: the slash is not left erased.
        const offset = await page
            .locator(".ide-brand .logo__slash")
            .evaluate((el) => getComputedStyle(el).strokeDashoffset);
        expect(parseFloat(offset)).toBe(0);
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
        // The logo animates on mobile too.
        expect(await brandAnimations(page)).toContain("ezBracketLeft");
    });
});
