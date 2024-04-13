import { Card, CardContent } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";
import TypeIt from "typeit-react";
import { ComboBox } from "@/components/combobox";
import { useState } from "react";
import { TThemeKey, themesToArray } from "@/lib/utils";

const codeBlock = `import { Card, CardContent } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";

const App = () => {
  return (
    <Card>
      <CardContent>
        <Highlight
          theme={themes.shadesOfPurple}
          code={codeBlock}
          language="tsx"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span>{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </CardContent>
    </Card>
  );
};

export default App;
`;

const App = () => {
  const [theme, setTheme] = useState<TThemeKey>("dracula");
  const themeOptions = themesToArray(themes);

  const selectedTheme = themes[theme];
  return (
    <div
      className="container flex flex-col
    gap-6"
    >
      <h1 className="text-4xl font-semibold">
        Welcome to Asthetic Code typer :)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <Card>
          <div>
            <ComboBox
              items={themeOptions}
              notFoundMessage="Theme not found"
              placeholder="Select the theme..."
              setValue={setTheme}
              value={theme}
            />
          </div>
        </Card>
        <Card>
          <CardContent>
            <Highlight theme={selectedTheme} code={codeBlock} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
      </div>
    </div>
  );
};

export default App;
