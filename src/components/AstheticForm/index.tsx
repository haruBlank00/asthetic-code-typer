import { FormBuilder, InputField } from "@/components/FormBuilder";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

type AstheticFormProps<T extends FieldValues> = {
  form: UseFormReturn<FieldValues, T>;
  onSubmit: SubmitHandler<FieldValues>;
  fields: InputField[];
  key: string;
};
export function AstheticForm<T>({
  form,
  onSubmit,
  fields,
}: AstheticFormProps<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBuilder control={form.control} fields={fields} />
      </form>
    </Form>
  );
}
