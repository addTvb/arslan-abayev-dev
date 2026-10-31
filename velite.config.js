import { defineConfig, s } from "velite";

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "blog/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(120),
          description: s.string().max(300),
          date: s.isodate(),
          updated: s.isodate().optional(),
          difficulty: s.enum(DIFFICULTIES),
          cover: s.image().optional(),
          draft: s.boolean().default(false),
          tags: s.array(s.string()).default([]),
          translationKey: s.string().max(80),
          metadata: s.metadata(),
          toc: s.toc(),
          code: s.mdx(),
          path: s.path(),
        })
        .transform((data) => {
          const parts = data.path.split("/");
          const locale = parts[1] === "ru" ? "ru" : "en";
          const slug = parts[parts.length - 1] ?? data.path;
          return {
            ...data,
            updated: data.updated ?? data.date,
            locale,
            slug,
            permalink: `/blog/${slug}`,
          };
        }),
    },
  },
});
