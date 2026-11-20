"use client";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { IdeIcon } from "./IdeIcon";
import { displayUrl, type ShownCapture } from "./preview-model";

// A STATIC capture of a real site in a browser frame, as on the mockup: an address bar with
// decorative (non-interactive) back/forward/reload glyphs, the image, an honest caption ("Site
// capture": not a live preview) and an "Open the site" link (`Button`, `external`: new tab,
// rel="noopener noreferrer", localized hidden "(new tab)"). A site with two themes ships two
// captures: CSS shows the one of the painted theme (styles/layout/ide-preview.css), and the hidden one, being
// `loading="lazy"` and `display: none`, is never downloaded. Fixed 640×400 ratio: no layout shift.
export function BrowserFrame({ capture }: { capture: ShownCapture }) {
    const t = useTranslations("ide");
    const alt = t(`captureAlt.${capture.id}`);
    const image = (src: string, theme?: "light" | "dark") => (
        // eslint-disable-next-line @next/next/no-img-element -- small static public asset, fixed size
        <img
            className="ide-browser__image"
            data-theme-only={theme}
            src={src}
            width={640}
            height={400}
            alt={alt}
            loading="lazy"
            decoding="async"
        />
    );
    return (
        <figure className="ide-browser" data-capture={capture.id}>
            <div className="ide-browser__window">
                <div className="ide-browser__bar">
                    <span className="ide-browser__nav" aria-hidden="true">
                        <IdeIcon name="back" size={14} />
                        <IdeIcon name="forward" size={14} />
                        <IdeIcon name="reload" size={14} />
                    </span>
                    <span className="ide-browser__url" translate="no">
                        <span className="ide-sr">{t("previewUrl")} </span>
                        {displayUrl(capture.url)}
                    </span>
                </div>
                {capture.imageDark ? (
                    <>
                        {image(capture.image, "light")}
                        {image(capture.imageDark, "dark")}
                    </>
                ) : (
                    image(capture.image)
                )}
            </div>
            <figcaption className="ide-browser__caption">
                <span>{t("captureCaption")}</span>
                <Button href={capture.url} external size="sm" variant="secondary" className="ide-browser__open">
                    {t("openSite")}
                </Button>
            </figcaption>
        </figure>
    );
}
