import { expect, test, type Page } from "@playwright/test";
import { acceptCookiesButton, cookieBanner, themeToggle } from "./support/home";
import { lp, lpRe } from "./support/locale-path";

// EZJSDEV IDE shell (site/shell.tsx → components/site/ide/*): explorer tree, tabs derived from the
// URL, panels, mobile drawer, overflow and themes. Pages are opened with an explicit locale prefix
// ("/fr/...", redirected to the canonical URL when fr is the default) so labels are known.
const at = (path = "") => `/fr${path}`;

async function ready(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
    // The cookie banner (present when CI enables ads) must not sit over what we click.
    if (await cookieBanner(page).isVisible()) {
        await acceptCookiesButton(page).click();
        await expect(cookieBanner(page)).toBeHidden();
    }
}

const tree = (page: Page) => page.getByRole("tree", { name: "Fichiers du site" });
const folder = (page: Page, name: string) => tree(page).getByRole("treeitem", { name, exact: true });
const folderRow = (page: Page, name: string) => folder(page, name).locator(":scope > .ide-tree__row");
const fileItem = (page: Page, name: RegExp) => tree(page).getByRole("treeitem", { name });
const tabs = (page: Page) => page.getByRole("navigation", { name: "Fichiers ouverts" });
const activeTab = (page: Page) => tabs(page).locator('[aria-current="page"]');

test.describe("IDE shell — desktop", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("landmarks: header, explorer, main, contentinfo with real links", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        await expect(page.getByRole("banner")).toBeVisible();
        await expect(page.getByRole("complementary", { name: "Explorateur" })).toBeVisible();
        await expect(page.getByRole("main")).toBeVisible();
        const footer = page.getByRole("contentinfo");
        await expect(footer.getByRole("link", { name: "Mentions légales" })).toHaveAttribute(
            "href",
            /mentions-legales/,
        );
        await expect(footer.getByRole("link", { name: "Plan du site" })).toBeVisible();
        // Real anchors in the tree too (crawlable, open-in-new-tab).
        await expect(fileItem(page, /^page\.tsx — ezjsdev/)).toHaveAttribute("href", /.+/);
    });

    test("folders open and close", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        const articles = folder(page, "Articles");
        await expect(articles).toHaveAttribute("aria-expanded", "false");
        await expect(fileItem(page, /debuter-avec-node-js\.md/)).toBeHidden();
        await folderRow(page, "Articles").click();
        await expect(articles).toHaveAttribute("aria-expanded", "true");
        await expect(fileItem(page, /debuter-avec-node-js\.md/)).toBeVisible();
        await folderRow(page, "Articles").click();
        await expect(articles).toHaveAttribute("aria-expanded", "false");
        await expect(fileItem(page, /debuter-avec-node-js\.md/)).toBeHidden();
    });

    test("a file opens its page, its tab and its URL; back/forward follow", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        await expect(activeTab(page)).toHaveText(/Accueil\/page\.tsx/);

        await folderRow(page, "Pense-betes").click();
        await fileItem(page, /pense-bete-github\.md/).click();
        await expect(page).toHaveURL(lpRe("fr", "/pense-betes/pense-bete-github"));
        await expect(page.getByRole("heading", { level: 1, name: "Pense-bête GitHub" })).toBeVisible();
        await expect(activeTab(page)).toHaveText(/pense-bete-github\.md/);
        await expect(fileItem(page, /pense-bete-github\.md/)).toHaveAttribute("aria-current", "page");

        await fileItem(page, /Plan du site/).click();
        await expect(page).toHaveURL(lpRe("fr", "/plan-du-site"));
        await expect(activeTab(page)).toHaveText(/Plan-du-site\/page\.tsx/);
        await expect(tabs(page).getByRole("link")).toHaveCount(3);

        await page.goBack();
        await expect(page).toHaveURL(lpRe("fr", "/pense-betes/pense-bete-github"));
        await expect(activeTab(page)).toHaveText(/pense-bete-github\.md/);
        await page.goBack();
        await expect(page).toHaveURL(lpRe("fr"));
        await expect(activeTab(page)).toHaveText(/Accueil\/page\.tsx/);
        await page.goForward();
        await expect(activeTab(page)).toHaveText(/pense-bete-github\.md/);
        await expect(page.getByRole("heading", { level: 1, name: "Pense-bête GitHub" })).toBeVisible();
    });

    test("a direct URL opens the right tab and reveals the file in the tree", async ({ page }) => {
        await page.goto(at("/articles/debuter-avec-node-js"));
        await ready(page);
        await expect(page.getByRole("heading", { level: 1, name: "Débuter avec Node.JS" })).toBeVisible();
        await expect(activeTab(page)).toHaveText(/debuter-avec-node-js\.md/);
        const item = fileItem(page, /debuter-avec-node-js\.md/);
        await expect(item).toBeVisible();
        await expect(item).toHaveAttribute("aria-current", "page");
        await expect(item).toHaveAttribute("tabindex", "0");
        // Home stays pinned (no close button); the article tab can be closed.
        await expect(tabs(page).getByRole("button")).toHaveCount(1);
    });

    test("closing the active tab opens its neighbour; the home is pinned", async ({ page }) => {
        await page.goto(at("/cookies"));
        await ready(page);
        await expect(activeTab(page)).toHaveText(/Cookies\/page\.tsx/);
        await tabs(page)
            .getByRole("button", { name: /Fermer Cookies/ })
            .click();
        await expect(page).toHaveURL(lpRe("fr"));
        await expect(activeTab(page)).toHaveText(/Accueil\/page\.tsx/);
        await expect(tabs(page).getByRole("link")).toHaveCount(1);
    });

    test("keyboard: arrows move in the tree, Right/Left open and close, Enter opens", async ({ page }) => {
        await page.goto(at("/plan-du-site"));
        await ready(page);
        const current = fileItem(page, /Plan du site/);
        await current.focus();
        await page.keyboard.press("ArrowUp"); // its folder
        const sitemap = folder(page, "Plan-du-site");
        await expect(sitemap).toBeFocused();
        await page.keyboard.press("ArrowLeft"); // close
        await expect(sitemap).toHaveAttribute("aria-expanded", "false");
        await page.keyboard.press("ArrowRight"); // open
        await expect(sitemap).toHaveAttribute("aria-expanded", "true");
        await page.keyboard.press("ArrowUp"); // Contact/page.tsx (folder open by default)
        await expect(fileItem(page, /^page\.tsx — Contact/)).toBeFocused();
        await page.keyboard.press("ArrowUp"); // Contact folder
        await expect(folder(page, "Contact")).toBeFocused();
        await page.keyboard.press("ArrowUp"); // Pense-betes folder (closed)
        const reminders = folder(page, "Pense-betes");
        await expect(reminders).toBeFocused();
        await page.keyboard.press("ArrowRight");
        await expect(reminders).toHaveAttribute("aria-expanded", "true");
        await page.keyboard.press("ArrowRight"); // first child: the listing
        await expect(fileItem(page, /Pense-bêtes$/)).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(lpRe("fr", "/pense-betes"));
        await expect(page.getByRole("heading", { level: 1, name: "Pense-bêtes" })).toBeVisible();
        await page.keyboard.press("Home");
        await expect(tree(page).locator('[aria-level="1"]').first()).toBeFocused();
    });

    test("preview and terminal show the open page and collapse", async ({ page }) => {
        await page.goto(at("/mentions-legales"));
        await ready(page);
        const preview = page.locator("#ide-preview");
        await expect(preview).toContainText("Mentions légales");
        await expect(preview.getByRole("link", { name: /English/ })).toHaveAttribute("href", lp("en", "/legal"));
        const terminal = page.getByRole("group", { name: "Sortie du terminal" });
        await expect(terminal).toContainText("open Mentions-legales/page.tsx");
        // Not announced on navigation (Next's route announcer already does): no live region.
        await expect(
            page.locator("#ide-terminal [aria-live]:not([aria-live='off']), #ide-terminal [role='log']"),
        ).toHaveCount(0);

        const togglePreview = page.getByRole("button", { name: "Masquer l'aperçu" });
        await togglePreview.click();
        await expect(page.getByRole("button", { name: "Afficher l'aperçu" })).toHaveAttribute("aria-expanded", "false");
        await expect(preview.locator(".ide-serp")).toBeHidden();

        await page.getByRole("button", { name: "Masquer le terminal" }).click();
        await expect(terminal).toBeHidden();
        await page.getByRole("button", { name: "Afficher le terminal" }).click();
        await expect(terminal).toBeVisible();
    });

    test("an unknown URL keeps the shell with no active tab nor terminal output", async ({ page }) => {
        await page.goto(at("/nope-nope"));
        await ready(page);
        await expect(page.locator(".not-found")).toBeVisible();
        await expect(activeTab(page)).toHaveCount(0);
        await expect(page.getByRole("group", { name: "Sortie du terminal" })).toHaveText("");
    });

    test("the page itself never scrolls: only the editor does, even on a long page", async ({ page }) => {
        const pageScroll = () =>
            page.evaluate(() => ({
                scrollHeight: document.documentElement.scrollHeight,
                innerHeight: window.innerHeight,
                scrollY: window.scrollY,
            }));
        await page.goto(at());
        await ready(page);
        await folderRow(page, "Pense-betes").click();
        await fileItem(page, /installation-de-node-js\.md/).click();
        await expect(page).toHaveURL(lpRe("fr", "/pense-betes/installation-de-node-js"));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        // A long reminder: the editor overflows, the document must not (regression: visually hidden
        // texts escaping the scroller added ~70px of page scroll and pushed the title bar away).
        expect(await page.locator("#main").evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
        const after = await pageScroll();
        expect(after.scrollHeight).toBe(after.innerHeight);
        expect(after.scrollY).toBe(0);
        await expect(page.getByRole("banner")).toBeInViewport();
        await expect(tabs(page)).toBeInViewport();
    });

    test("light and dark themes repaint the shell", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        const bar = page.locator(".ide-titlebar");
        const before = await page.getAttribute("html", "data-theme");
        const bgBefore = await bar.evaluate((el) => getComputedStyle(el).backgroundColor);
        await themeToggle(page).click();
        const after = await page.getAttribute("html", "data-theme");
        expect(after).not.toBe(before);
        await expect.poll(() => bar.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(bgBefore);
    });
});

test.describe("IDE shell — mobile (375px)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("the explorer is a drawer: opens, takes the focus, Escape closes it", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        const explorer = page.getByRole("complementary", { name: "Explorateur" });
        await expect(explorer).toBeHidden();
        const burger = page.getByRole("button", { name: "Ouvrir l'explorateur" });
        await burger.click();
        await expect(explorer).toBeVisible();
        await expect(fileItem(page, /^page\.tsx — ezjsdev/)).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(explorer).toBeHidden();
        await expect(burger).toBeFocused();
    });

    test("opening a file from the drawer navigates and closes it", async ({ page }) => {
        await page.goto(at());
        await ready(page);
        await page.getByRole("button", { name: "Ouvrir l'explorateur" }).click();
        await fileItem(page, /Confidentialité|Politique de confidentialité/).click();
        await expect(page).toHaveURL(lpRe("fr", "/confidentialite"));
        await expect(page.getByRole("complementary", { name: "Explorateur" })).toBeHidden();
        await expect(activeTab(page)).toHaveText(/Confidentialite\/page\.tsx/);
    });

    for (const path of [
        "",
        "/articles",
        "/articles/debuter-avec-node-js",
        "/pense-betes/pense-bete-github",
        "/plan-du-site",
    ]) {
        test(`no horizontal overflow at 375px: ${path || "/"}`, async ({ page }) => {
            await page.goto(at(path));
            await ready(page);
            const { scroll, client } = await page.evaluate(() => ({
                scroll: document.documentElement.scrollWidth,
                client: document.documentElement.clientWidth,
            }));
            expect(scroll).toBeLessThanOrEqual(client);
        });
    }
});
