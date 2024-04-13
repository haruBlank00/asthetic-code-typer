import { Input, InputProps } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { If } from "@/components/If";

export interface InputField extends InputProps {
  label: string;
  description?: string;
}

type FormBuilderProps = {
  fields: InputField[];
  control: Control;
};

export function FormBuilder({ fields, control }: FormBuilderProps) {
  const isEmpty = fields.length <= 0;
  if (isEmpty) {
    throw new Error("Can you build something with nothing? No?? ");
  }

  return fields.map((field) => {
    const { name, label, description, placeholder } = field;

    const hasDescripton = Boolean(description);
    return (
      <FormField
        control={control}
        name={name!}
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
