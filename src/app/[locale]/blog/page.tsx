import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { formatPostDate, getPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

type BlogIndexProps = {
  params: Promise<{ locale: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: BlogIndexProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  const metadata = buildPageMetadata(locale, {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    path: "/blog",
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: {
        "application/rss+xml": `${site.url}/feed.xml`,
      },
    },
  };
}

export default async function BlogIndexPage({ params }: BlogIndexProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const posts = getPosts(locale);

  return (
    <div className="site-shell flex min-h-full flex-col">
      <Header locale={locale} dict={dict} pathname="/blog" />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:px-8 sm:pt-14">
          <p className="mb-3 font-mono text-xs tracking-[0.22em] text-accent uppercase">
            {dict.blog.eyebrow}
          </p>
          <h1 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {dict.blog.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {dict.blog.subtitle}
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28">
          {posts.length === 0 ? (
            <p className="border-t border-border py-10 text-sm text-muted">
              {dict.blog.empty}
            </p>
          ) : (
            <ul className="border-t border-border">
              {posts.map((post) => {
                const readingTime = Math.max(
                  1,
                  Math.round(post.metadata.readingTime),
                );
                return (
                  <li key={post.slug} className="border-b border-border">
                    <Link
                      href={localePath(locale, post.permalink)}
                      className="group grid gap-3 py-8 transition-colors sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-8"
                    >
                      <time
                        dateTime={post.date}
                        className="font-mono text-xs tracking-wide text-muted"
                      >
                        {formatPostDate(post.date, locale)}
                      </time>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                            {post.title}
                          </h2>
                          {post.draft ? (
                            <span className="font-mono text-[0.65rem] tracking-[0.16em] text-accent uppercase">
                              {dict.blog.draftBadge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                          {post.description}
                        </p>
                        <p className="mt-3 text-sm text-muted">
                          {readingTime} {dict.blog.minRead}
                          {post.tags.length > 0 ? (
                            <>
                              <span aria-hidden className="mx-2 text-border">
                                ·
                              </span>
                              {post.tags.slice(0, 3).join(", ")}
                            </>
                          ) : null}
                          <span className="ml-3 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                            {dict.blog.readMore} →
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <Contact dict={dict} />
      </main>
    </div>
  );
}
