import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Callout } from "@/components/blog/Callout";
import { slugifyHeading } from "@/lib/blog";

function getText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return getText(props.children);
  }
  return "";
}

function Heading({
  as: Tag,
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { as: "h2" | "h3" }) {
  const text = getText(children);
  const id = props.id ?? slugifyHeading(text);
  return (
    <Tag
      {...props}
      id={id}
      className={["scroll-mt-28", className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href.startsWith("http");
  const isHash = href.startsWith("#");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  if (isHash || href === "") {
    return (
      <a href={href || undefined} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

function MdxImage(props: ComponentPropsWithoutRef<"img">) {
  const { src, alt = "", width, height } = props;
  if (!src || typeof src !== "string") return null;

  const numericWidth = typeof width === "number" ? width : 1200;
  const numericHeight = typeof height === "number" ? height : 675;

  if (src.startsWith("http") || src.startsWith("/")) {
    return (
      <span className="my-8 block overflow-hidden rounded-2xl border border-border">
        <Image
          src={src}
          alt={alt}
          width={numericWidth}
          height={numericHeight}
          className="h-auto w-full object-cover"
        />
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="my-8 h-auto w-full rounded-2xl border border-border"
    />
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Heading as="h3" {...props} />
  ),
  a: Anchor,
  img: MdxImage,
  Callout,
};
