import { AstheticForm } from "@/components/AstheticForm";
import { InputField } from "@/components/FormBuilder";
import { PrismCodeRenderer } from "@/components/PrismCodeRenderer";
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
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
const settingsFields: InputField[] = [
  {
    label: "Select Theme :)",
    name: "prism-theme",
    render({ field, controllerField }) {
      const value = controllerField.value;
      const setValue = (value: string) => controllerField.onChange(value);
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <ComboBox
              items={themeOptions}
              notFoundMessage="Theme not found"
              placeholder="Select the theme..."
              value={value}
              setValue={setValue as Dispatch<SetStateAction<string>>}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    },
  },
];

const App = () => {
  const { resolver, defaultValues } = useFormSchema({
    schema: z.object({
      "prism-theme": z.string().default("dracula"),
    }),
  });

  const settingsForm = useForm({
    resolver,
    defaultValues,
  });

  const selectedTheme =
    themes[settingsForm.watch("prism-theme") as keyof typeof themes];

  const onSubmit = (values: typeof defaultValues) => {
    console.log(values);
  };

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
          <AstheticForm
            fields={settingsFields}
            form={settingsForm}
            onSubmit={onSubmit}
          />
        </Card>

        <PrismCodeRenderer theme={selectedTheme} code={codeBlock} />
      </div>
    </div>
  );
};

export default App;
