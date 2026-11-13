"use client";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { IdeIcon } from "./IdeIcon";
import { treeKey, type TreeFile, type TreeFolder, type TreeNode, type VisibleNode } from "./tree-model";

// WAI-ARIA "navigation treeview" (APG): folders are treeitems with aria-expanded and a group of
// children, named by their label only (aria-labelledby, not the whole subtree); files are REAL links (<a href> with role="treeitem"), so crawlers, middle-click and
// "open in a new tab" keep working. Roving tabindex: one treeitem is in the tab order (the focused
// one, else the current file, else the first); arrows move the focus (tree-model.ts → treeKey).
// The site's pages also stay reachable through ordinary links (status bar, HTML sitemap page).
export interface ExplorerTreeProps {
    nodes: readonly TreeNode[];
    /** Flat list of what is laid out (collapsed folders' children excluded). */
    visible: readonly VisibleNode[];
    currentId: string | undefined;
    expanded: (folder: TreeFolder) => boolean;
    onToggle: (id: string, open: boolean) => void;
    onOpenFile: (file: TreeFile) => void;
    ariaLabel: string;
}

const domId = (id: string) => `ide-node-${id.replace(/[^a-zA-Z0-9_-]/g, "_")}`;

export function ExplorerTree({
    nodes,
    visible,
    currentId,
    expanded,
    onToggle,
    onOpenFile,
    ariaLabel,
}: ExplorerTreeProps) {
    const [focusId, setFocusId] = useState<string | null>(null);
    // Derived, never mirrored: a focused node that got hidden (folder collapsed) hands the tab stop
    // back to the current file, then to the first node.
    const isVisible = (id: string | null | undefined) => !!id && visible.some((v) => v.node.id === id);
    const tabStop = isVisible(focusId) ? focusId : isVisible(currentId) ? currentId : visible[0]?.node.id;

    const focusNode = (id: string) => {
        setFocusId(id);
        document.getElementById(domId(id))?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>, node: TreeNode) => {
        const open = node.kind === "folder" && expanded(node);
        const action = treeKey(visible, node.id, event.key, open);
        if (action.type === "none") {
            // Space activates a link treeitem too (Enter does natively).
            if (event.key === " " && node.kind === "file") {
                event.preventDefault();
                (event.currentTarget as HTMLAnchorElement).click();
            }
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (action.type === "focus") focusNode(action.id);
        else onToggle(action.id, action.open);
    };

    const renderNodes = (list: readonly TreeNode[], level: number): ReactNode =>
        list.map((node) => {
            if (node.kind === "file") {
                const current = node.id === currentId;
                return (
                    <li key={node.id} role="none">
                        <Link
                            id={domId(node.id)}
                            href={node.href}
                            role="treeitem"
                            aria-level={level}
                            aria-selected={current}
                            aria-current={current ? "page" : undefined}
                            tabIndex={node.id === tabStop ? 0 : -1}
                            className={cn("ide-tree__item ide-tree__file", current && "is-current")}
                            style={{ "--ide-depth": level } as CSSProperties}
                            title={node.title}
                            onFocus={() => setFocusId(node.id)}
                            onKeyDown={(e) => onKeyDown(e, node)}
                            onClick={() => onOpenFile(node)}
                        >
                            <IdeIcon name={node.name.endsWith(".md") ? "md" : "tsx"} size={16} />
                            <span className="ide-tree__name">{node.name}</span>
                            <span className="ide-sr"> — {node.title}</span>
                        </Link>
                    </li>
                );
            }
            const open = expanded(node);
            return (
                <li
                    key={node.id}
                    id={domId(node.id)}
                    role="treeitem"
                    aria-labelledby={`${domId(node.id)}-label`}
                    aria-level={level}
                    aria-expanded={open}
                    aria-selected={false}
                    tabIndex={node.id === tabStop ? 0 : -1}
                    className="ide-tree__folder"
                    onFocus={(e) => {
                        if (e.target === e.currentTarget) setFocusId(node.id);
                    }}
                    onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return;
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onToggle(node.id, !open);
                            return;
                        }
                        onKeyDown(e, node);
                    }}
                >
                    {/* The row is clickable with the mouse; keyboard users act on the treeitem itself. */}
                    <span
                        className="ide-tree__item ide-tree__row"
                        style={{ "--ide-depth": level } as CSSProperties}
                        onClick={() => {
                            onToggle(node.id, !open);
                            setFocusId(node.id);
                        }}
                    >
                        <IdeIcon name="chevron" size={14} className={cn("ide-tree__chevron", open && "is-open")} />
                        <IdeIcon name={open ? "folderOpen" : "folder"} size={16} />
                        <span id={`${domId(node.id)}-label`} className="ide-tree__name">
                            {node.label}
                        </span>
                    </span>
                    <ul role="group" className={cn("ide-tree__group", !open && "is-collapsed")}>
                        {renderNodes(node.children, level + 1)}
                    </ul>
                </li>
            );
        });

    return (
        <ul role="tree" aria-label={ariaLabel} className="ide-tree">
            {renderNodes(nodes, 1)}
        </ul>
    );
}
