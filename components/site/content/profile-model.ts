// PURE module (no React, no next-intl): the types of ezjsdev's projects and the schema.org data of
// the About page. Data: site/profile.ts. Unit tests: tests/unit/profile-model.test.ts.

export interface ProjectLink {
    /** Label key under `pages.projects.links`. */
    readonly key: string;
    readonly href: string;
}

export interface ProjectDecl {
    /** Copy key under `pages.projects.items`. */
    readonly id: string;
    /** Ongoing project (badge). */
    readonly current: boolean;
    readonly stack: readonly string[];
    readonly links: readonly ProjectLink[];
}

export interface ProfileFacts {
    readonly name: string;
    readonly jobTitle: string;
    readonly description: string;
    /** Absolute URL of the About page in the visited locale. */
    readonly url: string;
    readonly locale: string;
    readonly sameAs: readonly string[];
    readonly locality: string;
    readonly country: string;
    readonly school: string;
    readonly knowsAbout: readonly string[];
}

/**
 * schema.org `ProfilePage` whose main entity is the `Person`, serialized for a
 * <script type="application/ld+json"> ("<" escaped so no content can close the element).
 * Only facts given by the spec / CV: no e-mail, no phone, no rating.
 */
export function profileJsonLd(facts: ProfileFacts): string {
    const data = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: facts.url,
        inLanguage: facts.locale,
        mainEntity: {
            "@type": "Person",
            name: facts.name,
            jobTitle: facts.jobTitle,
            description: facts.description,
            url: facts.url,
            sameAs: [...facts.sameAs],
            address: { "@type": "PostalAddress", addressLocality: facts.locality, addressCountry: facts.country },
            alumniOf: { "@type": "CollegeOrUniversity", name: facts.school },
            knowsAbout: [...facts.knowsAbout],
        },
    };
    return JSON.stringify(data).replace(/</g, "\\u003c");
}
