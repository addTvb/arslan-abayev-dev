/* Velite compiles MDX to a function body evaluated at render time. */
/* eslint-disable react-hooks/static-components */
import type { ComponentType, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/blog/mdx-components";

type MdxComponentMap = Record<
  string,
  // MDX component map is intentionally loose — hosts both HTML tags and custom components.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentType<any>
>;

type MdxContentProps = {
  code: string;
  components?: MdxComponentMap;
};

function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as ComponentType<{
    components?: MdxComponentMap;
  }>;
}

export function MdxContent({ code, components }: MdxContentProps): ReactNode {
  const Component = getMDXComponent(code);
  return (
    <Component
      components={{
        ...(mdxComponents as MdxComponentMap),
        ...components,
      }}
    />
  );
}
