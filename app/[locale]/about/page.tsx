import { StaticPage } from "@/components/content/StaticPage";
import { profileJsonLd } from "@/components/site/content/profile-model";
import { SITE_URL } from "@/constants/site";
import { getPathname, Link } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { PROFILE } from "@/site/profile";
import { getTranslations } from "next-intl/server";

// EZJSDEV — About (spec v0.2 §5.2), staged as "A-propos/contenu.md" in the explorer: background,
// approach, expertise and the CV facts of §3.1 / §3.3. Copy: site/messages → `pages.about`
// (expertise reused from `siteHome.expertise`). No CV figure here (see site/profile.ts).

type Experience = { period: string; role: string; company: string; summary: string; stack?: string };

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
    const expertise = th.raw("expertise") as string[];
    const experience = t.raw("experience") as Experience[];
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
                            <h2>{t("approachTitle")}</h2>
                            {approach.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </section>

                        <section className="static-page__section">
                            <h2>{t("expertiseTitle")}</h2>
                            <ul>
                                {expertise.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="static-page__section">
                            <h2>{t("experienceTitle")}</h2>
                            <ol className="ez-timeline">
                                {experience.map((xp) => (
                                    <li key={`${xp.company}-${xp.period}`} className="ez-timeline__item">
                                        <h3>
                                            {xp.role} <span className="ez-timeline__company">— {xp.company}</span>
                                        </h3>
                                        <p className="ez-timeline__period">{xp.period}</p>
                                        <p>{xp.summary}</p>
                                        {xp.stack ? (
                                            <p className="ez-timeline__stack">
                                                <span className="ez-label">{t("stackLabel")}</span> {xp.stack}
                                            </p>
                                        ) : null}
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="static-page__section">
                            <h2>{t("educationTitle")}</h2>
                            <p>{t("education")}</p>
                        </section>

                        <nav className="ez-next" aria-label={t("nextTitle")}>
                            <h2>{t("nextTitle")}</h2>
                            <ul>
                                <li>
                                    <Link href="/services">{tn("services")}</Link>
                                </li>
                                <li>
                                    <Link href="/projects">{tn("projects")}</Link>
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
