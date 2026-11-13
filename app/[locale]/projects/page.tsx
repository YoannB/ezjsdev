import { StaticPage } from "@/components/content/StaticPage";
import { Link } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { PROJECTS } from "@/site/profile";
import { getTranslations } from "next-intl/server";

// EZJSDEV — Projects (spec v0.2 §5.4): context, exact role, contribution, real technologies and
// links. No figure (user decision: none of the CV figures is published) and no other client
// reference (§3.4). Copy: site/messages → `pages.projects.items.<id>`.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.projects" });
    return pageMetadata({ title: t("title"), description: t("intro"), href: "/projects", locale });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.projects" });
    const tn = await getTranslations({ locale, namespace: "nav" });
    const ts = await getTranslations({ locale, namespace: "showcase" });
    return (
        <StaticPage
            title={t("title")}
            intro={t("lead")}
            crumbs={[{ label: ts("bcHome"), href: "/" }, { label: t("title") }]}
            body={
                <div className="ez-page ez-projects">
                    {PROJECTS.map((project) => {
                        const p = (key: string) => t(`items.${project.id}.${key}`);
                        const contribution = t.raw(`items.${project.id}.contribution`) as string[];
                        const headingId = `project-${project.id}`;
                        return (
                            <section
                                key={project.id}
                                className="static-page__section ez-project"
                                aria-labelledby={headingId}
                                data-project={project.id}
                            >
                                <h2 id={headingId}>
                                    {p("name")}
                                    {project.current ? <span className="ez-badge">{t("current")}</span> : null}
                                </h2>
                                <p className="ez-project__tagline">{p("tagline")}</p>
                                <h3>{t("context")}</h3>
                                <p>{p("context")}</p>
                                <h3>{t("role")}</h3>
                                <p>{p("role")}</p>
                                <h3>{t("contribution")}</h3>
                                <ul>
                                    {contribution.map((c) => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                                <h3>{t("stack")}</h3>
                                <ul className="ez-tags">
                                    {project.stack.map((tech) => (
                                        <li key={tech}>{tech}</li>
                                    ))}
                                </ul>
                                {project.links.length ? (
                                    <>
                                        <h3>{t("linksTitle")}</h3>
                                        <ul>
                                            {project.links.map((l) => (
                                                <li key={l.href}>
                                                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                                                        {t(`links.${l.key}`)}
                                                        <span className="ide-sr"> {t("newTab")}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : null}
                            </section>
                        );
                    })}
                    <nav className="ez-next" aria-label={t("nextTitle")}>
                        <h2>{t("nextTitle")}</h2>
                        <ul>
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
    );
}
