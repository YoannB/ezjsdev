import { StaticPage } from "@/components/content/StaticPage";
import { Link } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

// EZJSDEV — Services (spec v0.2 §5.3): the six offers backed by the CV, nothing else (no SEO, no
// showcase site or landing page until their scope is confirmed). Copy: site/messages → `pages.services`.

type Service = { title: string; body: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.services" });
    return pageMetadata({ title: t("title"), description: t("intro"), href: "/services", locale });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.services" });
    const tn = await getTranslations({ locale, namespace: "nav" });
    const ts = await getTranslations({ locale, namespace: "showcase" });
    const items = t.raw("items") as Service[];
    return (
        <StaticPage
            title={t("title")}
            intro={t("lead")}
            crumbs={[{ label: ts("bcHome"), href: "/" }, { label: t("title") }]}
            body={
                <div className="ez-page ez-services">
                    <ol className="ez-services__list">
                        {items.map((s) => (
                            <li key={s.title} className="ez-services__item">
                                <h2>{s.title}</h2>
                                <p>{s.body}</p>
                            </li>
                        ))}
                    </ol>
                    <nav className="ez-next" aria-label={t("nextTitle")}>
                        <h2>{t("nextTitle")}</h2>
                        <ul>
                            <li>
                                <Link href="/projects">{tn("projects")}</Link>
                            </li>
                            <li>
                                <Link href="/about">{tn("about")}</Link>
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
