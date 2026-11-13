// Storybook fixtures of the IDE shell (no fs, no server): a small resolved tree as SiteShell.tsx
// would hand it to the client, and the English `ide` messages of the site.
import en from "@/site/messages/en.json";
import type { TreeFile, TreeNode } from "./tree-model";

export const storyMessages = { ide: en.ide };

const enHref = (route: string) => `/en${route === "/" ? "" : route}`;

const page = (id: string, folder: string, route: string, title: string, description: string): TreeFile => ({
    kind: "file",
    id,
    name: "page.tsx",
    tabLabel: `${folder}/page.tsx`,
    title,
    description,
    href: enHref(route),
    route,
    alternates: [
        { locale: "fr", href: route },
        { locale: "en", href: enHref(route) },
    ],
});

export const storyFile: TreeFile = {
    kind: "file",
    id: "reminders/github",
    name: "github-reminder.md",
    tabLabel: "github-reminder.md",
    title: "GitHub reminder",
    description: "A reminder of useful git commands.",
    href: "/en/reminders/github-reminder",
    route: "/reminders/[slug]",
    slug: "github-reminder",
    alternates: [
        { locale: "fr", href: "/pense-betes/pense-bete-github" },
        { locale: "en", href: "/en/reminders/github-reminder" },
        { locale: "de", href: "/de/merkzettel/github-merkzettel" },
    ],
};

export const storyTree: TreeNode[] = [
    {
        kind: "folder",
        id: "root",
        label: "EZJSDEV",
        defaultOpen: true,
        children: [
            {
                kind: "folder",
                id: "home",
                label: "Home",
                defaultOpen: true,
                children: [page("home/page", "Home", "/", "ezjsdev — Full-stack developer", "Home page.")],
            },
            {
                kind: "folder",
                id: "reminders",
                label: "Reminders",
                defaultOpen: false,
                children: [
                    page("reminders/page", "Reminders", "/reminders", "Reminders", "Technical cheat sheets."),
                    storyFile,
                ],
            },
            {
                kind: "folder",
                id: "legal",
                label: "Legal-notice",
                defaultOpen: true,
                children: [page("legal/page", "Legal-notice", "/legal", "Legal notice", "Publisher and host.")],
            },
        ],
    },
];
