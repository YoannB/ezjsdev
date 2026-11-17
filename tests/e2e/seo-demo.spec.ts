import { expect, test, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner } from "./support/home";

// EZJSDEV "Generate a site" demo (components/site/demo/*, spec v0.2 §7): a SCRIPTED simulation
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
const demoLog = (page: Page) => page.getByRole("region", { name: "Démonstration : génération d'un site" });
const card = (page: Page) => page.getByRole("article", { name: "Exemple de résultat : Axons" });
const cardTitle = (page: Page) => page.getByRole("heading", { name: "Exemple de résultat : Axons" });
const lines = (page: Page) => demoLog(page).locator(".terminal__line");

// Heights of the shell areas and the document overflow (the terminal must not grow with the demo).
const layout = (page: Page) =>
    page.evaluate(() => {
        const h = (sel: string) => document.querySelector(sel)?.getBoundingClientRect().height ?? -1;
        const scrolls = (sel: string) => {
            const el = document.querySelector<HTMLElement>(sel);
            return el ? el.scrollHeight > el.clientHeight + 1 : false;
        };
        const overflowY = (sel: string) => {
            const el = document.querySelector(sel);
            return el ? getComputedStyle(el).overflowY : "";
        };
        return {
            editor: h("#main"),
            preview: h("#ide-preview"),
            terminal: h("#ide-terminal"),
            terminalBody: h("#ide-terminal .ide-panel__body"),
            bodyScrolls: scrolls("#ide-terminal .ide-panel__body"),
            bodyOverflowY: overflowY("#ide-terminal .ide-panel__body"),
            logOverflowY: overflowY("#ide-terminal .ez-demo__log .terminal__body"),
            cardOverflowY: overflowY("#ide-terminal .ez-demo-card"),
            cardScrolls: scrolls("#ide-terminal .ez-demo-card"),
            docOverflow: document.documentElement.scrollHeight - window.innerHeight,
        };
    });
type Layout = Awaited<ReturnType<typeof layout>>;
function expectSameLayout(actual: Layout, ref: Layout) {
    for (const key of ["editor", "preview", "terminal", "terminalBody"] as const) {
        expect(Math.abs(actual[key] - ref[key]), key).toBeLessThanOrEqual(2);
    }
    expect(actual.docOverflow).toBeLessThanOrEqual(0);
}

test.describe("SEO site demo — desktop", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("click → scripted sequence → result card with the Axons preview link", async ({ page }) => {
        await ready(page);
        const button = homeButton(page);
        await expect(button).toHaveText("Générer un site");
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
        // Axons' Button as an `external` link: a real <a> with the button classes, new tab, safe rel,
        // and the hidden localized "(new tab)" in its accessible name.
        await expect(open).toHaveClass(/MuiButton-root/);
        await expect(open).toHaveAttribute("target", "_blank");
        await expect(open).toHaveAttribute("rel", "noopener noreferrer");
        await expect(open).toHaveAccessibleName(/Ouvrir le site.*\(nouvel onglet\)/);
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

    test("the button is busy while running (focus kept, no double launch), then replays", async ({ page }) => {
        await ready(page);
        // Axons' Button: a real <button> with its classes (not a hand-made one).
        await expect(homeButton(page)).toHaveClass(/MuiButton-root/);
        await expect(homeButton(page)).toHaveJSProperty("tagName", "BUTTON");
        await expect(terminalButton(page)).toHaveClass(/MuiButton-sizeSmall/);
        await homeButton(page).click();
        // Axons' busy state: aria-disabled + aria-busy, still enabled and focused, clicks ignored.
        await expect(homeButton(page)).toHaveAttribute("aria-busy", "true");
        await expect(homeButton(page)).toHaveAttribute("aria-disabled", "true");
        // Not natively disabled (Playwright's toBeEnabled() reads aria-disabled, so check the property).
        await expect(homeButton(page)).toHaveJSProperty("disabled", false);
        await expect(homeButton(page)).toBeFocused();
        await expect(homeButton(page)).toHaveText("Démonstration en cours…");
        await expect(terminalButton(page)).toHaveAttribute("aria-busy", "true");
        await expect(lines(page).nth(1)).toBeVisible();
        const before = await lines(page).count();
        // Busy: a pointer click (forced: the busy button has no pointer events, Playwright would
        // otherwise wait for the run to end) and Enter on the focused button are both ignored.
        await homeButton(page).click({ force: true });
        await page.keyboard.press("Enter");
        await expect(homeButton(page)).toHaveAttribute("aria-busy", "true");
        expect(await lines(page).count()).toBeGreaterThanOrEqual(before);
        await expect(card(page)).toBeVisible();
        await expect(cardTitle(page)).toBeFocused();
        await expect(homeButton(page)).not.toHaveAttribute("aria-busy", "true");

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

    test("fixed terminal height: editor, preview and terminal keep their size in every state", async ({ page }) => {
        await ready(page);
        const before = await layout(page);
        expect(before.docOverflow).toBeLessThanOrEqual(0);
        expect(before.terminalBody).toBeGreaterThan(150);

        await homeButton(page).click();
        await expect(lines(page).nth(2)).toBeVisible();
        expectSameLayout(await layout(page), before); // running

        await expect(card(page)).toBeVisible();
        const done = await layout(page);
        expectSameLayout(done, before); // result
        // No common scroller: the panel body never scrolls; the log and the card scroll on their own.
        expect(done.bodyScrolls).toBe(false);
        expect(done.bodyOverflowY).toBe("hidden");
        expect(done.logOverflowY).toBe("auto");
        expect(done.cardOverflowY).toBe("auto");
        // Log and card side by side, both inside the panel body.
        const box = (sel: string) => page.locator(sel).boundingBox();
        const [body, log, cardBox] = await Promise.all([
            box("#ide-terminal .ide-panel__body"),
            box("#ide-terminal .ez-demo__log"),
            box("#ide-terminal .ez-demo-card"),
        ]);
        expect(body && log && cardBox).toBeTruthy();
        if (body && log && cardBox) {
            expect(log.x + log.width).toBeLessThanOrEqual(cardBox.x);
            for (const b of [log, cardBox]) {
                expect(b.y).toBeGreaterThanOrEqual(body.y - 1);
                expect(b.y + b.height).toBeLessThanOrEqual(body.y + body.height + 1);
            }
        }
        // Scrolling the card moves the card only, not the log.
        if (done.cardScrolls) {
            await page.locator("#ide-terminal .ez-demo-card").hover();
            await page.mouse.wheel(0, 400);
            await expect
                .poll(() => page.locator("#ide-terminal .ez-demo-card").evaluate((el) => el.scrollTop))
                .toBeGreaterThan(0);
            expect(
                await page.locator("#ide-terminal .ez-demo__log .terminal__body").evaluate((el) => el.scrollTop),
            ).toBe(0);
            expect(await page.locator("#ide-terminal .ide-panel__body").evaluate((el) => el.scrollTop)).toBe(0);
        }

        // Thumbnail error state, same size.
        await page.route("**/demo/*.webp", (route) => route.abort());
        await page.reload();
        await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
        await homeButton(page).click();
        await expect(card(page).getByText("Aperçu indisponible")).toBeVisible();
        expectSameLayout(await layout(page), before);
    });

    test("navigating away cancels the run; the terminal shows the page status again", async ({ page }) => {
        await ready(page);
        await homeButton(page).click();
        await expect(lines(page).nth(1)).toBeVisible();
        await expect(homeButton(page)).toHaveAttribute("aria-busy", "true"); // still running
        await page.getByRole("contentinfo").getByRole("link", { name: "Plan du site" }).click();
        await expect(page).toHaveURL(/plan-du-site/);
        await expect(demoLog(page)).toHaveCount(0);
        await expect(page.locator("#ide-terminal")).toContainText("open Plan-du-site/page.tsx");
        await page.goBack();
        await expect(homeButton(page)).toHaveText("Générer un site");
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
        // No scroller inside the page: the panel has its natural height, bounded by its fixed content.
        const { terminalBody, bodyScrolls, bodyOverflowY, cardOverflowY } = await layout(page);
        expect(bodyScrolls).toBe(false);
        expect(bodyOverflowY).toBe("visible");
        expect(cardOverflowY).toBe("visible");
        expect(terminalBody).toBeLessThanOrEqual(64 * 16);
    });

    test.describe("touch", () => {
        test.use({ hasTouch: true });

        // Regression: a scroller with `overscroll-behavior: contain` inside the page kept the finger
        // once it reached its end; the page only moved from a gesture started outside the terminal.
        test("a wheel or touch scroll started in the terminal keeps scrolling the page", async ({ page }) => {
            await ready(page);
            await homeButton(page).click();
            await expect(card(page)).toBeVisible();
            const logBody = demoLog(page);
            const scrollY = () => page.evaluate(() => window.scrollY);
            // Log near the viewport top: the card, status bar and footer are still below.
            const placeLog = () =>
                logBody.evaluate((el) => {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: Math.max(0, top - 120), behavior: "instant" });
                });

            await placeLog();
            await logBody.hover();
            const start = await scrollY();
            await page.mouse.wheel(0, 300);
            await expect.poll(scrollY).toBeGreaterThan(start);

            // A finger drag from inside the log (CDP touch events: Playwright's touchscreen only taps).
            await placeLog();
            const box = await logBody.boundingBox();
            expect(box).toBeTruthy();
            const x = (box?.x ?? 0) + 40;
            const y0 = (box?.y ?? 0) + Math.min(100, (box?.height ?? 0) - 10);
            const before = await scrollY();
            const cdp = await page.context().newCDPSession(page);
            const touch = (type: "touchStart" | "touchMove" | "touchEnd", y: number) =>
                cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
            await touch("touchStart", y0);
            for (let step = 1; step <= 10; step++) await touch("touchMove", y0 - step * 25);
            await touch("touchEnd", y0 - 250);
            await expect.poll(scrollY).toBeGreaterThan(before + 100);
        });
    });
});
