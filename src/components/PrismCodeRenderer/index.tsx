import { Card, CardContent } from "@/components/ui/card";
import { Highlight, PrismTheme } from "prism-react-renderer";
import TypeIt, { TypeItProps } from "typeit-react";

type PrismCodeRendererProps = {
  theme: PrismTheme;
  code: string;
  typeItProps?: TypeItProps;
};
export const PrismCodeRenderer = ({
  theme,
  code,
  typeItProps,
}: PrismCodeRendererProps) => {
  return (
    <Card className="flex-1">
      <CardContent>
        <Highlight theme={theme} code={code} language="">
          {({ style, tokens, getLineProps, getTokenProps }) => {
            return (
              <pre style={style} className="min-h-96 min-w-96">
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
