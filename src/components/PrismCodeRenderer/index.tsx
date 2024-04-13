import { Card, CardContent } from "@/components/ui/card";
import { Highlight, PrismTheme, themes } from "prism-react-renderer";
import TypeIt from "typeit-react";

type PrismCodeRendererProps = {
  theme: PrismTheme;
  code: string;
};
export const PrismCodeRenderer = ({ theme, code }: PrismCodeRendererProps) => {
  return (
    <Card>
      <CardContent>
        <Highlight theme={theme} code={code} language="tsx">
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              <TypeIt>
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
          )}
        </Highlight>
      </CardContent>
    </Card>
  );
};
