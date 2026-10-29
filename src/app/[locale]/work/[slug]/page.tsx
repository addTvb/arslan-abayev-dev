import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStory } from "@/components/CaseStory";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, getProject, getProjectSlugs } from "@/content";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { caseStudyJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";

type CasePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const project = getProject(locale, slug);
  if (!project) return {};

  const dict = getDictionary(locale);
  return buildPageMetadata(locale, {
    title: `${project.name} — ${dict.work.readCase}`,
    description: project.summary,
    path: `/work/${project.id}`,
  });
}

export default async function CasePage({ params }: CasePageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const project = getProject(locale, slug);
  if (!project) notFound();

  const index = dict.projects.findIndex((item) => item.id === project.id);
  const workHref =
    localePath(locale, "/") === "/"
      ? "/#work"
      : `${localePath(locale, "/")}#work`;

  return (
    <div className="site-shell flex min-h-full flex-col">
      <JsonLd data={caseStudyJsonLd(locale, project, dict)} />
      <Header
        locale={locale}
        dict={dict}
        pathname={`/work/${project.id}`}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
          <Link
            href={workHref}
            className="inline-flex text-sm font-medium text-muted transition-colors hover:text-accent"
          >
            ← {dict.work.backToWork}
          </Link>
        </div>
        <CaseStory
          project={project}
          index={index >= 0 ? index : 0}
          locale={locale}
          labels={dict.work}
          standalone
        />
        <Contact dict={dict} />
      </main>
    </div>
  );
}
