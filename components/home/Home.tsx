import { LatestArticles } from "@/components/home/LatestArticles";
import { Button, Section } from "@/components/ui";
import { Link } from "@/i18n/routing";
import { DemoTrigger } from "@/components/site/demo/DemoTrigger";
import { PROJECTS } from "@/constants/profile";
import { getTranslations } from "next-intl/server";

// The home BODY, rendered by app/[locale]/page.tsx (which keeps the `meta.home` metadata) inside
// the IDE editor. Copy from the positioning validated by the user (messages → `siteHome`), a
// direct access to Contact and About (`Button` links), how he works (→ Services), a preview of the
// projects (§5.1), then the latest articles and reminders (LatestArticles: "archives" titles while
// every entry is an archive). Static Server Component.
export async function Home({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "siteHome" });
    const tp = await getTranslations({ locale, namespace: "pages.projects" });
    const approach = t.raw("approach") as string[];
    return (
        <div className="ez-home">
            <div className="ez-home__doc">
                <header className="ez-home__intro">
                    <p className="ez-home__kicker">{t("kicker")}</p>
                    <h1 className="ez-home__title">{t("title")}</h1>
                    <p className="ez-home__lead">{t("lead")}</p>
                    <p className="ez-home__actions">
                        <Button href="/contact" className="ez-cta">
                            {t("contactCta")}
                        </Button>
                        <Button href="/about" variant="secondary" className="ez-cta">
                            {t("aboutCta")}
                        </Button>
                    </p>
                    <DemoTrigger />
                </header>
                <Section id="approach" title={t("approachTitle")} className="ez-home__approach">
                    <ul>
                        {approach.map((item) => (
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
                <LatestArticles locale={locale} collection="reminders" />
            </div>
        </div>
    );
}
