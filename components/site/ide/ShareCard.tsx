"use client";
import { LOCALES } from "@/constants/site";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { displayDomain } from "./preview-model";
import type { TreeFile } from "./tree-model";

// The open page as a social network or a messaging app shows it when the link is shared: its
// og:image when it has one, its domain, title and description (the page's own metadata). The
// image slot is not rendered without an image (no placeholder, no fake picture): today only an
// entry with a cover has one; the per-page OpenGraph images (app/og) are not wired here yet;
// they would reach this card through `TreeFile.image`. Then, discreetly, the same page in the other languages.
export function ShareCard({ file, siteUrl }: { file: TreeFile; siteUrl: string }) {
    const t = useTranslations("ide");
    const others = file.alternates.filter((a) => a.href !== file.href);
    return (
        <div className="ide-share">
            <figure className="ide-share__figure">
                <figcaption className="ide-preview__caption">{t("shareCard")}</figcaption>
                <div className="ide-share__card">
                    {file.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- static public asset of unknown size
                        <img className="ide-share__image" src={file.image} alt="" loading="lazy" decoding="async" />
                    ) : null}
                    <div className="ide-share__body">
                        <p className="ide-share__domain" translate="no">
                            {displayDomain(siteUrl)}
                        </p>
                        <p className="ide-share__title">{file.title}</p>
                        <p className="ide-share__desc">{file.description}</p>
                    </div>
                </div>
            </figure>
            {others.length ? (
                <div className="ide-share__langs">
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
