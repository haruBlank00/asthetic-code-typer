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

type TRender<T extends FieldValues> = {
  controllerField: ControllerRenderProps<T, Path<T>>;
  field: InputField;
};
export interface InputField extends InputProps {
  label: string;
  description?: string;
  render?: ({ field }: TRender) => ReactElement;
}

type FormBuilderProps<T extends FieldValues> = {
  fields: InputField[];
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
    const { name, label, description, placeholder, render } = field;

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
