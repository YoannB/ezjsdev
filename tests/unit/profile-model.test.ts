import { profileJsonLd, visibleFigures, type ProjectDecl } from "@/components/site/content/profile-model";
import { PROFILE, PROJECT_SETTINGS, PROJECTS } from "@/site/profile";
import { describe, expect, it } from "vitest";

// PURE rules of ezjsdev's content pages (components/site/content/profile-model.ts) and the facts
// declared in site/profile.ts (spec v0.2 §3.1, §3.4, §5.4, §5.6).

const project: ProjectDecl = {
    id: "p",
    current: false,
    stack: ["Node.js"],
    links: [],
    figures: [{ key: "users", value: 10, style: "integer" }],
};

describe("visibleFigures", () => {
    it("hides every figure until their publication is enabled", () => {
        expect(visibleFigures(project, false)).toEqual([]);
    });

    it("returns the documented figures once publication is enabled", () => {
        expect(visibleFigures(project, true)).toEqual(project.figures);
    });
});

describe("profileJsonLd", () => {
    const facts = {
        name: "Jane Doe",
        jobTitle: "Developer",
        description: "About </script><b>",
        url: "https://example.test/about",
        locale: "en",
        sameAs: ["https://www.linkedin.com/in/jane"],
        locality: "Nantes",
        country: "FR",
        school: "School",
        knowsAbout: ["React"],
    };

    it("describes a ProfilePage whose main entity is the Person, with the given facts only", () => {
        const data = JSON.parse(profileJsonLd(facts));
        expect(data).toEqual({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            url: facts.url,
            inLanguage: "en",
            mainEntity: {
                "@type": "Person",
                name: "Jane Doe",
                jobTitle: "Developer",
                description: facts.description,
                url: facts.url,
                sameAs: facts.sameAs,
                address: { "@type": "PostalAddress", addressLocality: "Nantes", addressCountry: "FR" },
                alumniOf: { "@type": "CollegeOrUniversity", name: "School" },
                knowsAbout: ["React"],
            },
        });
    });

    it("escapes '<' so the content cannot close the script element", () => {
        expect(profileJsonLd(facts)).not.toContain("<");
    });
});

describe("site/profile.ts — the published facts", () => {
    it("keeps the myKeople figures unpublished by default (spec §5.4: publication to confirm)", () => {
        expect(PROJECT_SETTINGS.publishFigures).toBe(false);
        for (const p of PROJECTS) expect(visibleFigures(p, PROJECT_SETTINGS.publishFigures)).toEqual([]);
    });

    it("presents only Axons and myKeople (no client reference: spec §3.4)", () => {
        expect(PROJECTS.map((p) => p.id)).toEqual(["axons", "mykeople"]);
    });

    it("contacts through LinkedIn and the professional e-mail only", () => {
        expect(PROFILE.linkedinUrl).toBe("https://www.linkedin.com/in/yoann-barbier-89ba1810");
        expect(PROFILE.email).toBe("yoannbarbier44@gmail.com");
    });
});
