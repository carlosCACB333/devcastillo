import { clsx, getUniqueID } from "@heroui/shared-utils";
import { Highlight, Language, PrismTheme } from "prism-react-renderer";
import React, { forwardRef } from "react";

import defaultTheme from "@/libs/prism-theme";

interface CodeblockProps {
  language: Language;
  codeString: string;
  metastring?: string;
  theme?: PrismTheme;
  showLines?: boolean;
  removeIndent?: boolean;
  hideScrollBar?: boolean;
  className?: string;
  children?: (props: any) => React.ReactNode;
}

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta?: string) => {
  if (!meta) {
    return () => false;
  }

  if (!RE.test(meta)) {
    return () => false;
  }
  // @ts-ignore
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );

    return inRange;
  };
};

const Codeblock = forwardRef<HTMLPreElement, CodeblockProps>(
  (
    {
      codeString,
      language,
      showLines,
      theme: themeProp,
      metastring,
      hideScrollBar,
      removeIndent,
      className: classNameProp,
      ...props
    },
    ref
  ) => {
    const theme = themeProp || defaultTheme;
    const shouldHighlightLine = calculateLinesToHighlight(metastring);
    const isMultiLine = codeString.split("\n").length > 2;

    return (
      <Highlight code={codeString} language={language} theme={theme} {...props}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div className="w-full" data-language={language}>
            <pre
              ref={ref}
              className={clsx(
                className,
                classNameProp,
                "not-prose flex max-w-full",
                {
                  "flex-col": isMultiLine,
                  "scrollbar-hide overflow-x-scroll": hideScrollBar,
                }
              )}
              style={style}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <div
                    key={`${i}-${getUniqueID("line-wrapper")}`}
                    // {...lineProps}
                    className={clsx(
                      lineProps.className,
                      removeIndent ? "pr-4" : "px-4",
                      "relative [&>span]:relative [&>span]:z-10",
                      {
                        "px-2": showLines,
                      },
                      {
                        "before:content-[''] before:w-full before:h-full before:absolute before:z-0 before:left-0 before:bg-linear-to-r before:from-white/10 before:to-code-background":
                          shouldHighlightLine(i),
                      }
                    )}
                  >
                    {showLines && (
                      <span className="select-none text-xs mr-6 opacity-30">
                        {i + 1}
                      </span>
                    )}
                    {line.map((token, key) => {
                      const { key: _, ...p } = getTokenProps({ token, key });
                      return (
                        <span
                          key={`${key}-${getUniqueID("line")}`}
                          {...p}
                          className={className}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </pre>
          </div>
        )}
      </Highlight>
    );
  }
);

Codeblock.displayName = "CodeBlock";

export default Codeblock;
