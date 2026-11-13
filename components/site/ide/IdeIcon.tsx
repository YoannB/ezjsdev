import { cn } from "@/lib/cn";

// Line icons of the IDE shell (24x24, stroke = currentColor, decorative: aria-hidden). Axons'
// Icon set has no file/folder/panel glyphs, and adding names to it would edit an Axons file.
const PATHS = {
    files: "M14 3H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7zM14 3v4h4M9 21h9a2 2 0 0 0 2-2V9",
    article: "M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7",
    note: "M5 4h14v12l-5 5H5zM14 21v-5h5M9 9h6M9 13h4",
    mail: "M3 6h18v12H3zM3 7l9 6 9-6",
    tree: "M4 4h6v5H4zM14 15h6v5h-6zM14 4h6v5h-6zM7 9v8h7M10 6.5h4",
    github: "M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-1-2.5c3 0 6-2 6-5.5a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.9 3 5.9 3.3 5.9 3.3a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 4.6 9.5C4.6 13 7.6 15 10.6 15a3 3 0 0 0-1 2.5V21",
    preview: "M3 5h18v14H3zM12 5v14",
    terminal: "M4 5h16v14H4zM7 10l3 2-3 2M12 15h5",
    chevron: "M9 6l6 6-6 6",
    folder: "M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z",
    folderOpen:
        "M3 17.5v-11A1.5 1.5 0 0 1 4.5 5H9l2 2h7.5A1.5 1.5 0 0 1 20 8.5V10M3 17.5 5.5 11h16L19 19H4.5A1.5 1.5 0 0 1 3 17.5z",
    tsx: "M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 12m-9 0a9 3.6 0 1 0 18 0 9 3.6 0 1 0-18 0M12 12m-4.5-7.8a9 3.6 60 1 0 9 15.6 9 3.6 60 1 0-9-15.6M12 12m4.5-7.8a9 3.6 120 1 0-9 15.6 9 3.6 120 1 0 9-15.6",
    md: "M3 6h18v12H3zM6 15V9l2.5 3L11 9v6M15 9v6M13 13l2 2 2-2",
    menu: "M4 7h16M4 12h16M4 17h16",
    close: "M6 6l12 12M18 6L6 18",
    external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
} as const;

export type IdeIconName = keyof typeof PATHS;

export function IdeIcon({ name, size = 20, className }: { name: IdeIconName; size?: number; className?: string }) {
    return (
        <svg
            className={cn("ide-icon", `ide-icon--${name}`, className)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <path d={PATHS[name]} />
        </svg>
    );
}
