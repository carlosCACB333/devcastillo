"use client";
import { Code } from "@heroui/code";
import { Link } from "@heroui/link";
import { clsx } from "@heroui/shared-utils";
import { Snippet } from "@heroui/snippet";
import { Language } from "prism-react-renderer";
import { FC, HTMLAttributes } from "react";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Blockquote } from "../common/blockquote";
import Codeblock from "../common/codeblock";
import { VirtualAnchor, virtualAnchorEncode } from "../common/virtual-anchor";

const InlineCode = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Code color="primary" size="sm">
      {children}
    </Code>
  );
};

const CodeElement = ({
  className,
  children,
  meta,
}: {
  children?: React.ReactNode;
  className?: string;
  meta?: string;
}) => {
  const isMultiLine = (children as string)?.split?.("\n")?.length > 2;
  const language = (className?.replace(/language-/, "") ?? "jsx") as Language;
  const codeString = String(children).trim();
  if (!className) {
    return <InlineCode>{children}</InlineCode>;
  }

  return (
    <Snippet
      disableTooltip
      fullWidth
      hideSymbol
      classNames={{
        base: clsx(
          "px-0 bg-content2",
          {
            "items-start": isMultiLine,
          },
          className
        ),
        pre: "not-prose",
        copyButton: "text-gray-500",
      }}
      codeString={codeString}
    >
      <Codeblock
        codeString={codeString}
        language={language}
        metastring={meta}
      />
    </Snippet>
  );
};
interface LinkedHeadingProps extends HTMLAttributes<HTMLHeadElement> {
  as: keyof React.JSX.IntrinsicElements;
  linked?: boolean;
}

const LinkedHeading: React.FC<LinkedHeadingProps> = ({
  as,
  linked = true,
  id: idProp,
  className,
  children,
}) => {
  const Component = as;

  let id = idProp || virtualAnchorEncode(children as string);

  return (
    <Component
      className={clsx(!linked && className)}
      data-id={id}
      data-name={children}
      id={id}
    >
      {linked ? <VirtualAnchor id={id}>{children}</VirtualAnchor> : children}
    </Component>
  );
};

export const MDXContent: FC<{ children?: string }> = ({ children }) => {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeSlug, rehypeKatex]}
      components={{
        h1: (props) => <LinkedHeading as="h1" {...props} />,
        h2: (props) => <LinkedHeading as="h2" {...props} />,
        h3: (props) => <LinkedHeading as="h3" {...props} />,
        h4: (props) => <LinkedHeading as="h4" linked={false} {...props} />,
        h5: (props) => <LinkedHeading as="h5" linked={false} {...props} />,
        pre: ({ children, className }) => (
          <pre className={clsx("not-prose", className)}>{children}</pre>
        ),

        code: ({ children, className }) => (
          <CodeElement className={className}>{children}</CodeElement>
        ),

        a: (props) => (
          <Link
            href={props.href!}
            isExternal={props.href?.startsWith("http")}
            showAnchorIcon={props.href?.startsWith("http")}
            {...(props as any)}
          />
        ),
        blockquote: ({ ...props }) => (
          <Blockquote color={"primary" as any} {...props} />
        ),
      }}
    >
      {children}
    </Markdown>
  );
};
