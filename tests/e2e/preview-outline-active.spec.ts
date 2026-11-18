import { expect, test, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner } from "./support/home";

// EZJSDEV — the outline's ACTIVE section (components/site/ide/use-outline.ts) on desktop, with the
// terminal collapsed (the default: the editor is then taller, and a short page scrolls only a few
// hundred pixels, so its last headings never reach a fixed reading line) and with it open.
// The section being read must follow the scroll (top, middle, bottom: the last section is active
// at the end of the page) and a click in the outline must activate the chosen section, even one
// the scroll alone cannot bring to the reading line.
const at = (path: string) => `/fr${path}`;

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

const outline = (page: Page) => page.locator("#ide-preview").getByRole("navigation", { name: "Plan de la page" });
const links = (page: Page) => outline(page).locator(".ide-outline__link");
const terminalToggle = (page: Page) => page.locator("#ide-terminal .ide-panel__toggle");

/** Index of the item marked as the section being read (-1: none), checked to be the only one. */
async function activeIndex(page: Page) {
    return links(page).evaluateAll((els) => {
        const marked = els.flatMap((el, i) => (el.getAttribute("aria-current") === "location" ? [i] : []));
        return marked.length > 1 ? -2 : (marked[0] ?? -1);
    });
}

/** Scrolls the editor to a fraction of its scroll range (0 = top, 1 = bottom). */
async function scrollEditor(page: Page, fraction: number) {
    await page.locator("#main").evaluate((el, f) => {
        el.scrollTop = (el.scrollHeight - el.clientHeight) * f;
    }, fraction);
}

for (const terminal of ["collapsed", "open"] as const) {
    test.describe(`Outline active section — desktop, terminal ${terminal}`, () => {
        test.use({ viewport: { width: 1440, height: 900 } });

        for (const path of ["/a-propos", "/confidentialite"]) {
            test(`${path}: follows the scroll and the clicks`, async ({ page }) => {
                await page.goto(at(path));
                await ready(page);
                await expect(outline(page)).toBeVisible();
                if (terminal === "open") {
                    await terminalToggle(page).click();
                    await expect(terminalToggle(page)).toHaveAttribute("aria-expanded", "true");
                } else {
                    await expect(terminalToggle(page)).toHaveAttribute("aria-expanded", "false");
                }
                const count = await links(page).count();
                expect(count).toBeGreaterThan(2);
                const last = count - 1;
                // The page scrolls in the editor (otherwise there is nothing to follow).
                expect(await page.locator("#main").evaluate((el) => el.scrollHeight - el.clientHeight)).toBeGreaterThan(
                    0,
                );

                // Top: at most the first section.
                await scrollEditor(page, 0);
                await expect.poll(() => activeIndex(page)).toBeLessThanOrEqual(0);
                // Middle: a section between the first and the last one is being read.
                await scrollEditor(page, 0.5);
                await expect.poll(() => activeIndex(page)).toBeGreaterThanOrEqual(0);
                const middle = await activeIndex(page);
                expect(middle).toBeLessThan(last);
                // Bottom: the last section, the page can scroll no further.
                await scrollEditor(page, 1);
                await expect.poll(() => activeIndex(page)).toBe(last);
                // Back up: the scroll is followed both ways.
                await scrollEditor(page, 0);
                await expect.poll(() => activeIndex(page)).toBeLessThanOrEqual(0);

                // Clicks: every item becomes the active one, the last, then one before it, then the first.
                for (const index of [last, last - 1, 1, 0]) {
                    await links(page).nth(index).click();
                    await expect.poll(() => activeIndex(page)).toBe(index);
                }

                // After a click, scrolling again hands the active section back to the scroll.
                await links(page).nth(1).click();
                await expect.poll(() => activeIndex(page)).toBe(1);
                await page.locator("#main").hover();
                await page.mouse.wheel(0, 100_000);
                await expect.poll(() => activeIndex(page)).toBe(last);
            });
        }
    });
}
