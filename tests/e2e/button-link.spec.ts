import { expect, test, type Page } from "@playwright/test";
import { lp, lpRe } from "./support/locale-path";

// Button with `href` renders a REAL link styled as a button. Regression: the home CTAs
// and the 404 "Back to home" used to nest a <button> inside an <a> (invalid HTML:
// interactive content inside interactive content, two tab stops, ambiguous semantics).

async function hydrated(page: Page) {
    await expect(page.locator("#app-splash")).toHaveClass(/is-leaving/);
}

async function expectNoNestedInteractive(page: Page) {
    expect(await page.locator("a button, a [role='button'], button a, button button").count()).toBe(0);
}

test.describe("Button as a link", () => {
    test("the home contact CTA is a localized link, reachable with the keyboard", async ({ page }) => {
        await page.goto("/fr"); // explicit prefix forces the locale (redirected to lp("fr") when fr is the default)
        await hydrated(page);
        await expectNoNestedInteractive(page);

        const cta = page.locator(".ez-home__actions");
        const contact = cta.getByRole("link", { name: "Me contacter" });
        const about = cta.getByRole("link", { name: "Mon parcours" });
        await expect(contact).toHaveAttribute("href", lp("fr", "/contact"));
        await expect(cta.getByRole("button", { name: "Me contacter" })).toHaveCount(0);

        // Tab order: the contact link, then the about link (one tab stop each, not two).
        await contact.focus();
        await page.keyboard.press("Tab");
        await expect(about).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(lpRe("fr", "/a-propos"));
    });

    test("the 404 back-to-home action is a link to the localized home", async ({ page }) => {
        await page.goto("/fr/dsqd");
        await hydrated(page);
        await expectNoNestedInteractive(page);

        const home = page.locator(".not-found").getByRole("link", { name: "Retour à l'accueil" });
        await expect(home).toHaveAttribute("href", lp("fr"));
        await home.click();
        await expect(page).toHaveURL(lpRe("fr"));
    });
});
