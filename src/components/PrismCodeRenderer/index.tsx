import { Card, CardContent } from "@/components/ui/card";
import { Highlight, PrismTheme } from "prism-react-renderer";
import TypeIt, { TypeItProps } from "typeit-react";

type PrismCodeRendererProps = {
  theme: PrismTheme;
  code: string;
  typeItProps?: TypeItProps;
  language: string;
};

export const PrismCodeRenderer = ({
  theme,
  code,
  typeItProps,
  language,
}: PrismCodeRendererProps) => {
  return (
    <Card className="flex-1">
      <CardContent className="p-0 h-full">
        <Highlight theme={theme} code={code} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => {
            return (
              <pre style={style} className="h-full min-w-96 p-2">
                <TypeIt {...typeItProps}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className="p-1 border-r-white">{i + 1}</span>{" "}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </TypeIt>
              </pre>
            );
          }}
        </Highlight>
      </CardContent>
    </Card>
  );
};
