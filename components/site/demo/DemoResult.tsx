"use client";
import { useTheme } from "@/hooks/use-theme";
import { AXONS_PREVIEW_URL } from "@/site/profile";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IdeIcon } from "../ide/IdeIcon";
import { demoThumbnail } from "./demo-model";

// Result card of the demo (spec v0.2 §7.3): the Axons boilerplate this site is built on, its live
// preview URL and an "Open the site" link (new tab, no deployment). A static thumbnail of the preview
// in the painted theme (public/demo/, fixed 640×400 → no layout shift); if it fails to load, a
// plain fallback box keeps the card usable. Only facts already published on the Projects page.
// `focusOnMount`: the title takes the focus when the card appears at the end of a run.
export function DemoResult({ focusOnMount = false }: { focusOnMount?: boolean }) {
    const t = useTranslations("demo.result");
    const { effective } = useTheme();
    const src = demoThumbnail(effective);
    const [failed, setFailed] = useState<string | null>(null);
    const facts = t.raw("facts") as string[];
    return (
        <article className="ez-demo-card" aria-labelledby="ez-demo-card-title">
            <div className="ez-demo-card__inner">
                {failed === src ? (
                    <p className="ez-demo-card__thumb ez-demo-card__thumb--error">{t("thumbError")}</p>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element -- small static public asset, fixed size
                    <img
                        className="ez-demo-card__thumb"
                        src={src}
                        width={640}
                        height={400}
                        alt={t("thumbAlt")}
                        decoding="async"
                        onError={() => setFailed(src)}
                    />
                )}
                <div className="ez-demo-card__body">
                    <h3
                        id="ez-demo-card-title"
                        className="ez-demo-card__title"
                        tabIndex={-1}
                        ref={focusOnMount ? (el) => el?.focus() : undefined}
                    >
                        {t("title")}
                    </h3>
                    <p className="ez-demo-card__url" translate="no">
                        {AXONS_PREVIEW_URL}
                    </p>
                    <p className="ez-demo-card__text">{t("text")}</p>
                    <ul className="ez-demo-card__facts">
                        {facts.map((fact) => (
                            <li key={fact}>{fact}</li>
                        ))}
                    </ul>
                    <a
                        className="ez-demo-card__open"
                        href={AXONS_PREVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t("open")}
                        <span className="ide-sr"> {t("newTab")}</span>
                        <IdeIcon name="external" size={16} />
                    </a>
                </div>
            </div>
        </article>
    );
}
