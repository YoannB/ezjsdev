import type { ProjectDecl } from "@/components/site/content/profile-model";

// EZJSDEV — the facts behind the content pages (About, Projects, Contact) that are NOT copy:
// links, contact details and technology names. The copy itself (6 locales) lives
// in site/messages/<locale>.json under `pages.about`, `pages.projects`, `pages.contact`.
// Sources: spec v0.2 §3.1, §3.3, §5.4, §5.6 and the user's decisions (pro e-mail, LinkedIn first).

export const PROFILE = {
    name: "Yoann Barbier",
    linkedinUrl: "https://www.linkedin.com/in/yoann-barbier-89ba1810",
    email: "yoannbarbier44@gmail.com",
    locality: "Nantes",
    country: "FR",
    school: "Polytech'Nantes",
    // Technologies of the expertise list (spec §3.2), for the Person's `knowsAbout`.
    knowsAbout: ["React", "TypeScript", "Node.js", "NestJS", "Vue.js", "Nuxt", "Angular"],
} as const;

// Order = display order (Projects page, home preview): Axons first, myKeople presented soberly
// (context, role, stack) with NO figure (user decision). Copy: `pages.projects.items.<id>`.
export const PROJECTS = [
    {
        id: "axons",
        current: true,
        // Technologies of the repository itself (package.json of Axons / this site).
        stack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Material UI",
            "next-intl",
            "Vitest",
            "Playwright",
            "Storybook",
            "Netlify",
        ],
        links: [
            { key: "source", href: "https://github.com/YoannB/axons" },
            { key: "preview", href: "https://axons-preview.netlify.app/fr" },
        ],
    },
    {
        id: "mykeople",
        current: false,
        // Spec §3.3: "Architecture MEAN … microservices, Socket.IO".
        stack: ["MongoDB", "Express", "Angular", "Node.js", "Socket.IO"],
        links: [],
    },
] as const satisfies readonly ProjectDecl[];
