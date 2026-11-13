"use client";
import { LOCALES } from "@/constants/site";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { IdeIcon } from "./IdeIcon";
import type { TreeFile } from "./tree-model";

// Body of the preview panel: how the OPEN page presents itself — its public URL, a search-result
// snippet built from its real title and description, and the same page in the other languages.
// Only data of the page itself (spec §6.4: a rendering panel, not a second navigation).
export function PagePreview({ file, siteUrl }: { file: TreeFile | undefined; siteUrl: string }) {
    const t = useTranslations("ide");
    if (!file) return <p className="ide-preview__empty">{t("previewEmpty")}</p>;
    const url = new URL(file.href, siteUrl).toString();
    const others = file.alternates.filter((a) => a.href !== file.href);
    return (
        <div className="ide-preview">
            <div className="ide-preview__address">
                <span className="ide-sr">{t("previewUrl")} </span>
                <span className="ide-preview__url" translate="no">
                    {url}
                </span>
                <a
                    className="ide-btn"
                    href={file.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={t("openInNewTab")}
                    title={t("openInNewTab")}
                >
                    <IdeIcon name="external" size={16} />
                </a>
            </div>
            <figure className="ide-serp">
                <figcaption className="ide-preview__caption">{t("searchPreview")}</figcaption>
                <p className="ide-serp__url" translate="no">
                    {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </p>
                <p className="ide-serp__title">{file.title}</p>
                <p className="ide-serp__desc">{file.description}</p>
            </figure>
            {others.length ? (
                <div className="ide-preview__langs">
                    <h3 className="ide-preview__caption">{t("previewLanguages")}</h3>
                    <ul>
                        {others.map((a) => {
                            const meta = LOCALES.find((l) => l.code === a.locale);
                            return (
                                <li key={a.locale}>
                                    <Link href={a.href} hrefLang={a.locale} lang={a.locale}>
                                        <span aria-hidden="true">{meta?.flag}</span> {meta?.native ?? a.locale}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}
