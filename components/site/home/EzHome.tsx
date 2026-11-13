import { ArticleFeed } from "@/components/content/ArticleFeed";
import { LatestArticles } from "@/components/home/LatestArticles";
import { Section } from "@/components/ui";
import { getCollection } from "@/constants/site";
import { Link } from "@/i18n/routing";
import { getEntries } from "@/lib/articles/source";
import type { SiteHomeProps } from "@/lib/site-extension";
import { PROJECTS } from "@/site/profile";
import { getTranslations } from "next-intl/server";

const LATEST_REMINDERS = 3;

// ezjsdev's home BODY (exported as `SiteHome` by site/home.tsx), shown in the IDE editor. Copy from
// the CV-backed positioning of spec v0.2 §3.1–§3.2 (site/messages → `siteHome`), a direct access to
// Contact and About, the expertise (→ Services), a preview of the projects (§5.1), then the latest
// articles (Axons block) and the latest reminders. Static Server Component.
export async function EzHome({ locale }: SiteHomeProps) {
    const t = await getTranslations({ locale, namespace: "siteHome" });
    const tp = await getTranslations({ locale, namespace: "pages.projects" });
    const expertise = t.raw("expertise") as string[];
    const reminders = getCollection("reminders");
    const latest = reminders.enabled ? getEntries(reminders.id, locale, LATEST_REMINDERS) : [];
    return (
        <div className="ez-home">
            <div className="ez-home__doc">
                <header className="ez-home__intro">
                    <p className="ez-home__kicker">{t("kicker")}</p>
                    <h1 className="ez-home__title">{t("title")}</h1>
                    <p className="ez-home__lead">{t("lead")}</p>
                    <p className="ez-home__actions">
                        <Link href="/contact" className="ez-home__action ez-home__action--primary">
                            {t("contactCta")}
                        </Link>
                        <Link href="/about" className="ez-home__action">
                            {t("aboutCta")}
                        </Link>
                    </p>
                </header>
                <Section id="expertise" title={t("expertiseTitle")} className="ez-home__expertise">
                    <ul>
                        {expertise.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                    <Link href="/services" className="latest-articles__all">
                        {t("servicesAll")} →
                    </Link>
                </Section>
                <Section id="projects" title={t("projectsTitle")} className="ez-home__projects">
                    <ul>
                        {PROJECTS.map((project) => (
                            <li key={project.id}>
                                <strong>{tp(`items.${project.id}.name`)}</strong> — {tp(`items.${project.id}.tagline`)}
                            </li>
                        ))}
                    </ul>
                    <Link href="/projects" className="latest-articles__all">
                        {t("projectsAll")} →
                    </Link>
                </Section>
                <LatestArticles locale={locale} />
                {latest.length ? (
                    <Section id="latest-reminders" title={t("remindersTitle")} className="latest-articles">
                        <ArticleFeed
                            items={latest}
                            locale={locale}
                            headingLevel="h3"
                            namespace={reminders.namespace}
                            itemHref="/reminders/[slug]"
                        />
                        <Link href="/reminders" className="latest-articles__all">
                            {t("remindersAll")} →
                        </Link>
                    </Section>
                ) : null}
            </div>
        </div>
    );
}
