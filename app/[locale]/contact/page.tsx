import { StaticPage } from "@/components/content/StaticPage";
import { pageMetadata } from "@/lib/seo";
import { PROFILE } from "@/site/profile";
import { getTranslations } from "next-intl/server";

// EZJSDEV — Contact (spec v0.2 §5.6): LinkedIn first, then the professional e-mail as a mailto
// link. No phone, no form (nothing is collected by the site). Copy: site/messages → `pages.contact`.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.contact" });
    return pageMetadata({ title: t("title"), description: t("intro"), href: "/contact", locale });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pages.contact" });
    const ts = await getTranslations({ locale, namespace: "showcase" });
    return (
        <StaticPage
            title={t("title")}
            intro={t("lead")}
            crumbs={[{ label: ts("bcHome"), href: "/" }, { label: t("title") }]}
            body={
                <div className="ez-page ez-contact">
                    <section className="static-page__section ez-contact__channel ez-contact__channel--primary">
                        <h2>{t("linkedinTitle")}</h2>
                        <p>{t("linkedinBody")}</p>
                        <p>
                            <a
                                className="ez-contact__cta"
                                href={PROFILE.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("linkedinCta")}
                                <span className="ide-sr"> {t("newTab")}</span>
                            </a>
                        </p>
                    </section>
                    <section className="static-page__section ez-contact__channel">
                        <h2>{t("emailTitle")}</h2>
                        <p>{t("emailBody")}</p>
                        <p>
                            <a className="ez-contact__email" href={`mailto:${PROFILE.email}`}>
                                {PROFILE.email}
                            </a>
                        </p>
                    </section>
                    <section className="static-page__section">
                        <h2>{t("locationTitle")}</h2>
                        <p>{t("location")}</p>
                    </section>
                </div>
            }
        />
    );
}
