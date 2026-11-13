import type { ProjectDecl } from "@/components/site/content/profile-model";

// EZJSDEV — the facts behind the content pages (About, Projects, Contact) that are NOT copy:
// links, contact details, technology names and the CV figures. The copy itself (6 locales) lives
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

export const PROJECT_SETTINGS = {
    /**
     * Publish the myKeople figures of the CV (spec §3.1, §5.4: "sous réserve que la publication de
     * ces informations soit toujours autorisée"). Kept OUT of the messages on purpose: messages are
     * sent to the client, so a figure stored there would ship in every page even when hidden.
     */
    publishFigures: false,
} as const;

// Order = display order (Projects page, home preview). Copy: `pages.projects.items.<id>`.
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
        figures: [],
    },
    {
        id: "mykeople",
        current: false,
        // Spec §3.3: "Architecture MEAN … microservices, Socket.IO".
        stack: ["MongoDB", "Express", "Angular", "Node.js", "Socket.IO"],
        links: [],
        // Spec §3.1 / §3.3 (CV): "plus de 16 000 utilisateurs", "93 % de taux de participation".
        figures: [
            { key: "users", value: 16000, style: "integer" },
            { key: "participation", value: 0.93, style: "percent" },
        ],
    },
] as const satisfies readonly ProjectDecl[];
