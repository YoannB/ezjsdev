import { profileJsonLd } from "@/components/site/content/profile-model";
import { PROFILE, PROJECTS } from "@/site/profile";
import { describe, expect, it } from "vitest";

// schema.org data of the About page (components/site/content/profile-model.ts) and the facts
// declared in site/profile.ts (spec v0.2 §3.1, §3.4, §5.4, §5.6; no CV figure is published).

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
    it("presents Axons first, then myKeople, and nothing else (no client reference: spec §3.4)", () => {
        expect(PROJECTS.map((p) => p.id)).toEqual(["axons", "mykeople"]);
    });

    it("declares no figure for any project (none of the CV figures is published)", () => {
        for (const p of PROJECTS) expect(Object.keys(p)).toEqual(["id", "current", "stack", "links"]);
    });

    it("contacts through LinkedIn and the professional e-mail only", () => {
        expect(PROFILE.linkedinUrl).toBe("https://www.linkedin.com/in/yoann-barbier-89ba1810");
        expect(PROFILE.email).toBe("yoannbarbier44@gmail.com");
    });
});
