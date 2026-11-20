import { StaticPage } from "@/components/content/StaticPage";
import { profileJsonLd } from "@/components/site/content/profile-model";
import { SITE_URL } from "@/constants/site";
import { getPathname, Link } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { PROFILE } from "@/constants/profile";
import { getTranslations } from "next-intl/server";

// EZJSDEV — About (spec v0.2 §5.2), staged as "A-propos/contenu.md" in the explorer. Short and
// turned to today (independent full-stack developer, author of Axons); the full background lives
// on LinkedIn, linked from here (user decision). Copy: messages → `pages.about`. No figure.
// Headings carry stable ids: the preview panel's outline links to them (constants/preview.ts).

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.about" });
    return pageMetadata({ title: t("title"), description: t("intro"), href: "/about", locale });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.about" });
    const th = await getTranslations({ locale, namespace: "siteHome" });
    const tn = await getTranslations({ locale, namespace: "nav" });
    const ts = await getTranslations({ locale, namespace: "showcase" });
    const summary = t.raw("summary") as string[];
    const approach = t.raw("approach") as string[];
    const background = t.raw("background") as string[];
    const jsonLd = profileJsonLd({
        name: PROFILE.name,
        jobTitle: th("title"),
        description: t("intro"),
        url: new URL(getPathname({ locale, href: "/about" }), SITE_URL).toString(),
        locale,
        sameAs: [PROFILE.linkedinUrl],
        locality: PROFILE.locality,
        country: PROFILE.country,
        school: PROFILE.school,
        knowsAbout: PROFILE.knowsAbout,
    });
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
            <StaticPage
                title={t("title")}
                intro={t("lead")}
                crumbs={[{ label: ts("bcHome"), href: "/" }, { label: t("title") }]}
                body={
                    <div className="ez-page ez-about">
                        <aside className="ez-callout" aria-labelledby="about-summary">
                            <h2 id="about-summary">{t("summaryTitle")}</h2>
                            <ul>
                                {summary.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </aside>

                        <section className="static-page__section">
                            <h2 id="about-approach">{t("approachTitle")}</h2>
                            {approach.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </section>

                        <section className="static-page__section">
                            <h2 id="about-background">{t("backgroundTitle")}</h2>
                            <ul>
                                {background.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <p>
                                <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                    {t("linkedinCta")}
                                    <span className="ide-sr"> {t("newTab")}</span>
                                </a>
                            </p>
                        </section>

                        <nav className="ez-next" aria-label={t("nextTitle")}>
                            <h2 id="about-next">{t("nextTitle")}</h2>
                            <ul>
                                <li>
                                    <Link href="/projects">{tn("projects")}</Link>
                                </li>
                                <li>
                                    <Link href="/services">{tn("services")}</Link>
                                </li>
                                <li>
                                    <Link href="/contact">{tn("contact")}</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                }
            />
        </>
    );
}
