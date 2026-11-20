import { expect, test, type Locator, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner } from "./support/home";
import { lp } from "./support/locale-path";

// EZJSDEV — the CONTEXTUAL preview panel (components/site/ide/PagePreview.tsx, constants/preview.ts):
// the outline of long pages and entries, browser frames around static captures (home, Projects),
// the share card everywhere else. Pages are opened with an explicit locale prefix ("/fr/...",
// redirected to the canonical URL when fr is the default) so labels are known.
const at = (path = "") => `/fr${path}`;

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    // The cookie banner (present when CI enables ads) must not sit over what we click.
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

const preview = (page: Page) => page.locator("#ide-preview");
const outline = (page: Page) => preview(page).getByRole("navigation", { name: "Plan de la page" });
const outlineLinks = (page: Page) => outline(page).locator(".ide-outline__link");
const editorHeadings = (page: Page) => page.locator("#main").locator("h2, h3");
const frames = (page: Page) => preview(page).locator("figure.ide-browser");

/** The document itself never scrolls on desktop (the editor and the panels do). */
async function expectNoDocumentScroll(page: Page) {
    const { scrollHeight, innerHeight, scrollY } = await page.evaluate(() => ({
        scrollHeight: document.documentElement.scrollHeight,
        innerHeight: window.innerHeight,
        scrollY: window.scrollY,
    }));
    expect(scrollHeight).toBe(innerHeight);
    expect(scrollY).toBe(0);
}

/** Every visible capture of a frame is a loaded image (the hidden theme's one is not needed). */
async function expectLoadedCapture(frame: Locator) {
    const image = frame.locator("img.ide-browser__image:visible");
    await expect(image).toHaveCount(1);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth)).toBe(640);
    await expect(image).toHaveAttribute("alt", /.+/);
}

/** A safe external link: new tab, no opener, no referrer. */
async function expectSafeExternal(link: Locator, href: string) {
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);
}

test.describe("Preview panel — desktop", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("an entry's outline lists its real headings; a click scrolls the editor to the section", async ({ page }) => {
        await page.goto(at("/pense-betes/pense-bete-github"));
        await ready(page);
        await expect(outline(page)).toBeVisible();

        const headings = (await editorHeadings(page).allTextContents()).map((h) => h.replace(/\s+/g, " ").trim());
        expect(headings.length).toBeGreaterThan(2);
        await expect(outlineLinks(page)).toHaveText(headings);

        // Markdown headings (rendered by Axons) have no id: the item scrolls to the element.
        const index = 2;
        const target = editorHeadings(page).nth(index);
        await expect(target).not.toBeInViewport();
        await outlineLinks(page).nth(index).click();
        await expect(target).toBeInViewport();
        expect(await page.locator("#main").evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
        // The section being read follows the scroll.
        await expect(outlineLinks(page).nth(index)).toHaveAttribute("aria-current", "location");
        await expect(outline(page).locator('[aria-current="location"]')).toHaveCount(1);
        await expectNoDocumentScroll(page);
    });

    test("a page whose headings have ids links to its anchors", async ({ page }) => {
        await page.goto(at("/a-propos"));
        await ready(page);
        const approach = outline(page).getByRole("link", {
            name: (await page.locator("#about-approach").textContent())!,
        });
        await expect(approach).toHaveAttribute("href", "#about-approach");
        await outline(page).getByRole("link").last().click();
        await expect(page).toHaveURL(/#about-next$/);
        await expect(page.locator("#about-next")).toBeInViewport();
        await expectNoDocumentScroll(page);
    });

    test("home: the Axons capture in a browser frame, with a safe external link", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        await expect(frames(page)).toHaveCount(1);
        const frame = frames(page).first();
        await expect(frame).toHaveAttribute("data-capture", "axons");
        await expect(frame.locator(".ide-browser__url")).toContainText("axons-preview.netlify.app/fr");
        await expect(frame).toContainText("Capture du site");
        await expectLoadedCapture(frame);
        await expectSafeExternal(
            frame.getByRole("link", { name: /Ouvrir le site/ }),
            "https://axons-preview.netlify.app/fr",
        );
        // The back/forward/reload glyphs are decorative: nothing to press in the frame but the link.
        await expect(frame.getByRole("button")).toHaveCount(0);
        await expectNoDocumentScroll(page);
    });

    test("Projects: Axons then idealco.fr, both captures loaded", async ({ page }) => {
        await page.goto(at("/projets"));
        await ready(page);
        await expect(frames(page)).toHaveCount(2);
        expect(await frames(page).evaluateAll((els) => els.map((el) => el.getAttribute("data-capture")))).toEqual([
            "axons",
            "idealco",
        ]);
        await expectLoadedCapture(frames(page).nth(0));
        await expectLoadedCapture(frames(page).nth(1));
        await expectSafeExternal(
            frames(page)
                .nth(1)
                .getByRole("link", { name: /Ouvrir le site/ }),
            "https://idealco.fr",
        );
        await expectNoDocumentScroll(page);
    });

    test("Contact: the share card (title, description, domain) and the other languages", async ({ page }) => {
        await page.goto(at("/contact"));
        await ready(page);
        const card = preview(page).locator(".ide-share");
        await expect(card).toContainText("Carte de partage");
        await expect(card.locator(".ide-share__title")).toHaveText(
            (await page.getByRole("heading", { level: 1 }).textContent())!,
        );
        await expect(card.locator(".ide-share__desc")).not.toBeEmpty();
        await expect(card.locator(".ide-share__domain")).toHaveText(/^[a-z0-9.-]+(:\d+)?$/);
        // No OpenGraph image for this page: no image slot at all (never a fake picture).
        await expect(card.locator(".ide-share__image")).toHaveCount(0);
        await expect(card.getByRole("link", { name: /English/ })).toHaveAttribute("href", lp("en", "/contact"));
        await expect(outline(page)).toHaveCount(0);
        await expectNoDocumentScroll(page);
    });

    test("the panel folds and unfolds", async ({ page }) => {
        await page.goto(at("/contact"));
        await ready(page);
        const card = preview(page).locator(".ide-share");
        await expect(card).toBeVisible();
        await page.getByRole("button", { name: "Masquer l'aperçu" }).click();
        await expect(page.getByRole("button", { name: "Afficher l'aperçu" })).toHaveAttribute("aria-expanded", "false");
        await expect(card).toBeHidden();
        await page.getByRole("button", { name: "Afficher l'aperçu" }).click();
        await expect(page.getByRole("button", { name: "Masquer l'aperçu" })).toHaveAttribute("aria-expanded", "true");
        await expect(card).toBeVisible();
        await expectNoDocumentScroll(page);
    });
});

test.describe("Preview panel — mobile (375px)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("folded under the editor, it unfolds to the outline; a click scrolls to the section", async ({ page }) => {
        await page.goto(at("/pense-betes/pense-bete-github"));
        await ready(page);
        const show = page.getByRole("button", { name: "Afficher l'aperçu" });
        await expect(show).toHaveAttribute("aria-expanded", "false");
        await expect(outline(page)).toBeHidden();
        await show.click();
        await expect(outline(page)).toBeVisible();
        const target = editorHeadings(page).nth(2);
        await outlineLinks(page).nth(2).click();
        await expect(target).toBeInViewport();
    });

    for (const path of ["", "/projets", "/contact", "/a-propos"]) {
        test(`unfolded, no horizontal overflow: ${path || "/"}`, async ({ page }) => {
            await page.goto(at(path));
            await ready(page);
            await page.getByRole("button", { name: "Afficher l'aperçu" }).click();
            await expect(preview(page).locator(".ide-preview")).toBeVisible();
            for (const frame of await frames(page).all()) await expectLoadedCapture(frame);
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
            expect(overflow).toBeLessThanOrEqual(0);
        });
    }
});
