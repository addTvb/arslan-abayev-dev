import Image from "next/image";
import Link from "next/link";
import { MdxContent } from "@/components/blog/MdxContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { site } from "@/content/site";
import type { Dictionary } from "@/content/types";
import { localePath, type Locale } from "@/i18n/config";
import {
  flattenToc,
  formatPostDate,
  type BlogPost,
  type TocEntry,
} from "@/lib/blog";

type PostArticleProps = {
  post: BlogPost;
  related: BlogPost[];
  locale: Locale;
  dict: Dictionary;
};

export function PostArticle({
  post,
  related,
  locale,
  dict,
}: PostArticleProps) {
  const labels = dict.blog;
  const readingTime = Math.max(1, Math.round(post.metadata.readingTime));
  const tocItems = flattenToc((post.toc ?? []) as TocEntry[]);
  const authorName = site.nameLocalized[locale];
  const tags = post.tags ?? [];

  return (
    <article className="pb-16 pt-10 sm:pt-14 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link
          href={localePath(locale, "/blog")}
          className="inline-flex text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← {labels.backToBlog}
        </Link>

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            {post.cover ? (
              <div className="mb-10 overflow-hidden rounded-2xl border border-border lg:max-w-4xl lg:mx-auto">
                <Image
                  src={post.cover.src}
                  alt={post.title}
                  width={post.cover.width}
                  height={post.cover.height}
                  priority
                  className="mx-auto max-h-[28rem] w-full object-cover"
                  placeholder={post.cover.blurDataURL ? "blur" : "empty"}
                  blurDataURL={post.cover.blurDataURL}
                />
              </div>
            ) : null}

            <header className="mx-auto max-w-4xl text-center">
              {post.draft ? (
                <p className="mb-4 font-mono text-xs tracking-[0.18em] text-accent uppercase">
                  {labels.draftBadge}
                </p>
              ) : null}
              <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2 text-foreground">
                  <Image
                    src="/me/ars.png"
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover"
                  />
                  <span>
                    <span className="sr-only">{labels.writtenBy} </span>
                    {authorName}
                  </span>
                </span>
                <span aria-hidden className="text-border">
                  ·
                </span>
                <span>
                  {readingTime} {labels.minRead}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
                <span>
                  {labels.publishedLabel}{" "}
                  <time dateTime={post.date} className="text-foreground/80">
                    {formatPostDate(post.date, locale)}
                  </time>
                </span>
                <span aria-hidden className="text-border">
                  ·
                </span>
                <span>
                  {labels.updatedLabel}{" "}
                  <time dateTime={post.updated} className="text-foreground/80">
                    {formatPostDate(post.updated, locale)}
                  </time>
                </span>
              </div>
            </header>

            <div className="mx-auto max-w-4xl">
              <TableOfContents
                items={tocItems}
                labels={labels}
                variant="mobile"
              />

              <div className="blog-prose mt-10 sm:mt-12">
                <MdxContent code={post.code} />
              </div>

              {tags.length > 0 ? (
                <section
                  aria-label={labels.tagsLabel}
                  className="mt-12 border-t border-border pt-8"
                >
                  <p className="mb-4 font-mono text-xs tracking-[0.18em] text-accent uppercase">
                    {labels.tagsLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-flex rounded-full border border-border bg-background-elevated px-3.5 py-1.5 text-sm text-muted">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {related.length > 0 ? (
                <section className="mt-16 border-t border-border pt-10">
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    {labels.relatedTitle}
                  </h2>
                  <ul className="mt-6 space-y-0">
                    {related.map((item) => (
                      <li key={item.slug} className="border-b border-border">
                        <Link
                          href={localePath(locale, item.permalink)}
                          className="group flex flex-col gap-1 py-5 transition-colors"
                        >
                          <span className="font-medium text-foreground transition-colors group-hover:text-accent">
                            {item.title}
                          </span>
                          <span className="text-sm text-muted">
                            {item.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>

          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} labels={labels} />
          </aside>
        </div>
      </div>
    </article>
  );
}
