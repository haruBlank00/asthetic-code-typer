import { If } from "@/components/If";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { ReactElement } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type TRender<T extends FieldValues> = {
  controllerField: ControllerRenderProps<T, Path<T>>;
  field: InputField<T>;
};
export interface InputField<T extends FieldValues> extends InputProps {
  label: string;
  description?: string;
  render?: ({ field }: TRender<T>) => ReactElement;
  el?: "switch" | "textArea";
}

type FormBuilderProps<T extends FieldValues> = {
  fields: InputField<T>[];
  control: Control<T>;
};

export function FormBuilder<T extends FieldValues>({
  fields,
  control,
}: FormBuilderProps<T>) {
  const isEmpty = fields.length <= 0;
  if (isEmpty) {
    throw new Error("Can you build something with nothing? No?? ");
  }

  return fields.map((field) => {
    const { name, label, description, placeholder, render, el } = field;

    const hasDescripton = Boolean(description);
    const hasCustomRender = render !== undefined;
    if (hasCustomRender) {
      return (
        <FormField
          key={name}
          control={control}
          name={name! as Path<T>}
          render={({ field: controllerField }) =>
            render({
              controllerField,
              field,
            })
          }
        />
      );
    }

    const isOtherThanInputElement = Boolean(el);
    if (isOtherThanInputElement) {
      if (el === "switch") {
        return (
          <FormField
            key={name}
            control={control}
            name={name! as Path<T>}
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-lg">{label}</FormLabel>

                <If condition={hasDescripton}>
                  <FormDescription>{description}</FormDescription>
                </If>

                <FormMessage />
              </FormItem>
            )}
          />
        );
      }

      if (el === "textArea") {
        return (
          <FormField
            key={name}
            control={control}
            name={name! as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 items-center">
                <FormLabel className="text-lg">{label}</FormLabel>
                <FormControl>
                  <Textarea placeholder={placeholder} {...field} rows={10} />
                </FormControl>

                <If condition={hasDescripton}>
                  <FormDescription>{description}</FormDescription>
                </If>

                <FormMessage />
              </FormItem>
            )}
          />
        );
      }
    }
    return (
      <FormField
        key={name}
        control={control}
        name={name! as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>

            <If condition={hasDescripton}>
              <FormDescription>{description}</FormDescription>
            </If>

            <FormMessage />
          </FormItem>
        )}
      />
    );
  });
}
