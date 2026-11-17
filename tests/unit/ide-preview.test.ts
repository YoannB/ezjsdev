import {
    activeSection,
    displayDomain,
    displayUrl,
    extractOutline,
    previewMode,
    sameOutline,
    type PreviewDecl,
} from "@/components/site/ide/preview-model";
import { describe, expect, it } from "vitest";

// PURE model of the IDE preview panel (components/site/ide/preview-model.ts): inline fixtures, no
// DOM, no next-intl. The site's own declaration (site/preview.ts) is not pinned here.
const decl: PreviewDecl = {
    outline: ["long/page"],
    browser: { "home/page": ["a"], "work/page": ["a", "missing", "b"], "broken/page": ["missing"] },
    captures: {
        a: { name: "A", url: "https://a.example", image: "/a-light.webp", imageDark: "/a-dark.webp" },
        b: { name: "B", url: "https://b.example/fr", image: "/b.webp" },
    },
};

describe("previewMode", () => {
    it("nothing open (404) → empty", () => {
        expect(previewMode(undefined, decl)).toEqual({ kind: "empty" });
    });

    it("a browser page → its captures in order, with their ids; unknown ids skipped", () => {
        expect(previewMode({ id: "home/page" }, decl)).toEqual({
            kind: "browser",
            captures: [{ ...decl.captures.a, id: "a" }],
        });
        const work = previewMode({ id: "work/page" }, decl);
        expect(work.kind === "browser" && work.captures.map((c) => c.id)).toEqual(["a", "b"]);
    });

    it("a browser page whose captures are all unknown → share card", () => {
        expect(previewMode({ id: "broken/page" }, decl)).toEqual({ kind: "share" });
    });

    it("a declared long page → outline", () => {
        expect(previewMode({ id: "long/page" }, decl)).toEqual({ kind: "outline" });
    });

    it("every collection entry (it has a slug) → outline", () => {
        expect(previewMode({ id: "notes/e1", slug: "first" }, decl)).toEqual({ kind: "outline" });
    });

    it("any other page → share card", () => {
        expect(previewMode({ id: "contact/page" }, decl)).toEqual({ kind: "share" });
    });
});

describe("extractOutline", () => {
    it("keeps h2/h3 in order with their anchors, collapsing whitespace", () => {
        expect(
            extractOutline([
                { level: 2, id: "intro", text: "  Intro\n  text " },
                { level: 3, id: " detail ", text: "Detail" },
            ]),
        ).toEqual([
            { index: 0, level: 2, text: "Intro text", id: "intro" },
            { index: 1, level: 3, text: "Detail", id: "detail" },
        ]);
    });

    it("a heading without id has no anchor (scrolled to by position)", () => {
        expect(extractOutline([{ level: 2, id: "", text: "Plain" }])).toEqual([{ index: 0, level: 2, text: "Plain" }]);
    });

    it("drops other levels and empty headings, without shifting the positions of the next ones", () => {
        expect(
            extractOutline([
                { level: 1, id: "t", text: "Title" },
                { level: 4, id: "", text: "Deep" },
                { level: 2, id: "", text: "   " },
                { level: 3, id: "", text: "Kept" },
            ]),
        ).toEqual([{ index: 3, level: 3, text: "Kept" }]);
    });

    it("an empty page → no outline", () => {
        expect(extractOutline([])).toEqual([]);
    });
});

describe("sameOutline", () => {
    const a = extractOutline([
        { level: 2, id: "x", text: "X" },
        { level: 3, id: "", text: "Y" },
    ]);

    it("same headings → true", () => {
        expect(
            sameOutline(a, extractOutline([...a.map((i) => ({ level: i.level, id: i.id ?? "", text: i.text }))])),
        ).toBe(true);
    });

    it("a different length → false", () => {
        expect(sameOutline(a, a.slice(1))).toBe(false);
    });

    it("any field that differs → false", () => {
        expect(sameOutline(a, [{ ...a[0], index: 9 }, a[1]])).toBe(false);
        expect(sameOutline(a, [{ ...a[0], level: 3 }, a[1]])).toBe(false);
        expect(sameOutline(a, [{ ...a[0], text: "Z" }, a[1]])).toBe(false);
        expect(sameOutline(a, [a[0], { ...a[1], id: "y" }])).toBe(false);
    });
});

describe("activeSection", () => {
    it("the last heading above the reading line", () => {
        expect(activeSection([-400, -20, 90, 600], 100)).toBe(2);
    });

    it("a heading exactly on the line counts as reached", () => {
        expect(activeSection([100, 300], 100)).toBe(0);
    });

    it("above the first heading → -1; no heading → -1", () => {
        expect(activeSection([150, 400], 100)).toBe(-1);
        expect(activeSection([], 100)).toBe(-1);
    });
});

describe("display helpers", () => {
    it("displayUrl drops the scheme and the trailing slash", () => {
        expect(displayUrl("https://a.example/")).toBe("a.example");
        expect(displayUrl("http://a.example/fr")).toBe("a.example/fr");
    });

    it("displayDomain keeps the host only", () => {
        expect(displayDomain("https://ezjs.dev/fr/contact")).toBe("ezjs.dev");
    });
});
