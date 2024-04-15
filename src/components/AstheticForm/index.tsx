import { FormBuilder, InputField } from "@/components/FormBuilder";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

type AstheticFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  fields: InputField<T>[];
  footer: () => JSX.Element;
};
export function AstheticForm<T extends FieldValues>({
  form,
  onSubmit,
  fields,
  footer,
}: AstheticFormProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBuilder control={form.control} fields={fields} />
        {footer()}
      </form>
    </Form>
  );
}
