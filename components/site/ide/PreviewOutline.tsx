"use client";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import type { OutlineItem } from "./preview-model";

// The page's outline, like VS Code's "Outline" view: its h2/h3 headings in order, h3 indented,
// the section being read marked `aria-current="location"`. A heading with an id is a real link to
// its anchor (#id: the browser scrolls the editor, the URL can be shared); a heading the page
// renders without an id (Markdown and legal pages, rendered by Axons) is a button that scrolls to
// it. Presentational: the items and the scrolling come from PagePreview (use-outline.ts).
export function PreviewOutline({
    items,
    active,
    onSelect,
}: {
    items: readonly OutlineItem[];
    /** Position in `items` of the section being read (-1: none). */
    active: number;
    /** An item was chosen (a link scrolls to its anchor by itself; a button must be scrolled to). */
    onSelect: (item: OutlineItem) => void;
}) {
    const t = useTranslations("ide");
    return (
        <nav className="ide-outline" aria-labelledby="ide-outline-title">
            <h3 id="ide-outline-title" className="ide-preview__caption">
                {t("outline")}
            </h3>
            <ul className="ide-outline__list">
                {items.map((item, i) => {
                    const current = i === active ? ("location" as const) : undefined;
                    return (
                        <li
                            key={item.index}
                            className={cn("ide-outline__item", item.level === 3 && "ide-outline__item--sub")}
                        >
                            {item.id ? (
                                <a
                                    className="ide-outline__link"
                                    href={`#${item.id}`}
                                    aria-current={current}
                                    onClick={() => onSelect(item)}
                                >
                                    {item.text}
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    className="ide-outline__link"
                                    aria-current={current}
                                    onClick={() => onSelect(item)}
                                >
                                    {item.text}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
