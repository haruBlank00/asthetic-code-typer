import { AstheticForm } from "@/components/AstheticForm";
import { InputField } from "@/components/FormBuilder";
import { ComboBox } from "@/components/combobox";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormSchema } from "@/hooks/useFormSchema";
import { themesToArray } from "@/lib/utils";
import { themes } from "prism-react-renderer";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { TypeItProps } from "typeit-react";
import { z } from "zod";
import { PrismCodeRenderer } from "./components/PrismCodeRenderer";
import { Button } from "./components/ui/button";
import { supportedLanguages } from "./data/prism/supported-languages";
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
const themeOptions = themesToArray(themes);

const App = () => {
  const { resolver, defaultValues } = useFormSchema({
    schema: z.object({
      "prism-theme": z.string().default("dracula"),
      "prism-language": z.string().default("jsx"),
      breakLines: z.boolean().default(true),
      lifeLike: z.boolean().default(true),
      speed: z.string().default("1"),
      loop: z.boolean().default(false),
      code: z.string().default(codeBlock),
    }),
  });
  const settingsForm = useForm({
    resolver,
    defaultValues,
  });
  const [typeItInstance, setTypeItInstance] = useState<unknown>();
  const [showTyper, setShowTyper] = useState(false);

  const settingsFields: InputField<typeof defaultValues>[] = [
    {
      label: "Select Theme :)",
      name: "prism-theme",
      render({ field, controllerField }) {
        const value = controllerField.value;
        const setValue = (value: string) => controllerField.onChange(value);
        return (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-lg">{field.label}</FormLabel>
            <FormControl>
              <ComboBox
                items={themeOptions}
                notFoundMessage="Theme not found"
                placeholder="Select the theme..."
                value={value as string}
                setValue={setValue as Dispatch<SetStateAction<string>>}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      },
    },
    {
      label: "Select Language :)",
      name: "prism-language",
      render({ field, controllerField }) {
        const value = controllerField.value;
        const setValue = (value: string) => controllerField.onChange(value);
        return (
          <FormItem className="flex flex-col gap-2">
            <FormLabel className="text-lg">{field.label}</FormLabel>
            <FormControl>
              <ComboBox
                items={supportedLanguages}
                notFoundMessage="Language not found"
                placeholder="Select the Language..."
                value={value as string}
                setValue={setValue as Dispatch<SetStateAction<string>>}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      },
    },
    {
      label: "Break Lines",
      name: "breakLines",
      el: "switch",
    },
    {
      label: "Life Like",
      name: "lifeLike",
      el: "switch",
    },
    {
      label: "Loop",
      name: "loop",
      el: "switch",
    },
    {
      label: "Speed",
      name: "speed",
      type: "number",
    },
    {
      label: "Code",
      name: "code",
      el: "textArea",
    },
  ];

  const selectedTheme =
    themes[settingsForm.getValues("prism-theme") as keyof typeof themes];
  const selectedLanguage = settingsForm.getValues("prism-language");

  const code = settingsForm.watch("code");

  const typeItOptions: TypeItProps["options"] = {
    speed: Number.parseInt(settingsForm.getValues("speed")),
    lifeLike: settingsForm.getValues("lifeLike"),
    breakLines: settingsForm.getValues("breakLines"),
    loop: settingsForm.getValues("loop"),
  };

  return (
    <div
      className="max-w-screen-xl mx-auto flex flex-col
    gap-6 min-h-screen"
    >
      <h1 className="text-4xl font-semibold">
        Welcome to Asthetic Code typer :)
      </h1>

      <div className="flex gap-4 md:gap-8">
        <Card className="w-96 p-4">
          <AstheticForm
            fields={settingsFields}
            form={settingsForm}
            onSubmit={() => {
              setShowTyper(true);
            }}
            footer={() => {
              return (
                <div className="py-4">
                  <Button
                    onClick={() => setShowTyper(false)}
                    className="w-full"
                  >
                    Start Typing ◉‿◉
                  </Button>
                </div>
              );
            }}
          />
        </Card>

        {showTyper ? (
          <PrismCodeRenderer
            language={selectedLanguage}
            theme={selectedTheme}
            code={code}
            typeItProps={{
              options: typeItOptions,
              getBeforeInit(instance) {
                setTypeItInstance(instance);
                return instance;
              },
            }}
          />
        ) : (
          <h1>nothing to show</h1>
        )}
      </div>
    </div>
  );
};

export default App;
