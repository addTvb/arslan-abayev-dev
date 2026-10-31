import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { PostArticle } from "@/components/blog/PostArticle";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import {
  getPost,
  getPosts,
  getRelatedPosts,
  getSiblingPost,
} from "@/lib/blog";
import {
  blogBreadcrumbJsonLd,
  blogPostingJsonLd,
} from "@/lib/json-ld";
import { absoluteUrl, languageAlternates } from "@/lib/urls";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

/** Blog post HTML depends on route params; allow a blocking shell. */
export const instant = false;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const post = getPost(locale, slug);
  if (!post) return {};

  const path = post.permalink;
  const canonical = absoluteUrl(locale, path);
  const ogImageUrl = absoluteUrl(locale, `${path}/opengraph-image`);
  const siblingEn = getSiblingPost(post, "en");
  const siblingRu = getSiblingPost(post, "ru");

  const languages = {
    ...(siblingEn
      ? { en: absoluteUrl("en", siblingEn.permalink) }
      : {}),
    ...(siblingRu
      ? { ru: absoluteUrl("ru", siblingRu.permalink) }
      : {}),
    "x-default": absoluteUrl(
      "en",
      siblingEn?.permalink ?? path,
    ),
  };

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    robots: post.draft
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: getDictionary(locale).meta.ogLocale,
      url: canonical,
      siteName: site.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [site.name],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical,
      languages:
        siblingEn && siblingRu
          ? languages
          : languageAlternates(path),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const post = getPost(locale, slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const related = getRelatedPosts(post);
  const siblingEn = getSiblingPost(post, "en");
  const siblingRu = getSiblingPost(post, "ru");

  return (
    <div className="site-shell flex min-h-full flex-col">
      <JsonLd data={blogPostingJsonLd(locale, post, dict)} />
      <JsonLd data={blogBreadcrumbJsonLd(locale, post, dict)} />
      <Header
        locale={locale}
        dict={dict}
        pathname={post.permalink}
        localeSwitchPaths={{
          en: siblingEn?.permalink ?? "/blog",
          ru: siblingRu?.permalink ?? "/blog",
        }}
      />
      <main className="flex-1">
        <PostArticle
          post={post}
          related={related}
          locale={locale}
          dict={dict}
        />
        <Contact dict={dict} />
      </main>
    </div>
  );
}
