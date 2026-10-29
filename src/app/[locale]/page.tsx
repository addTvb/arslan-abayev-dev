import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProofStrip } from "@/components/ProofStrip";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";
import { getDictionary } from "@/content";
import { isLocale, type Locale } from "@/i18n/config";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="site-shell flex min-h-full flex-col">
      <JsonLd data={personJsonLd(locale, dict)} />
      <JsonLd data={websiteJsonLd(locale, dict)} />
      <Header locale={locale} dict={dict} pathname="/" />
      <main className="flex-1">
        <Hero locale={locale} dict={dict} />
        <ProofStrip dict={dict} />
        <About dict={dict} />
        <Work locale={locale} dict={dict} />
        <Approach dict={dict} />
        <Stack dict={dict} />
        <Contact dict={dict} />
      </main>
    </div>
  );
}
