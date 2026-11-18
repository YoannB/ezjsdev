import { StaticPage } from "@/components/content/StaticPage";
import { Link } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

// EZJSDEV — Services: "what I can do", the offers validated by the user (positioning of 2026-11), nothing
// else, never a price. Copy: site/messages → `pages.services`.
// Headings carry stable ids (position, not translated text): the preview panel's outline links to them.

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
                    <h2 id="services-list">{t("listTitle")}</h2>
                    <ol className="ez-services__list">
                        {items.map((s, i) => (
                            <li key={s.title} className="ez-services__item">
                                <h3 id={`service-${i + 1}`}>{s.title}</h3>
                                <p>{s.body}</p>
                            </li>
                        ))}
                    </ol>
                    <nav className="ez-next" aria-label={t("nextTitle")}>
                        <h2 id="services-next">{t("nextTitle")}</h2>
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
