import { zodResolver } from "@hookform/resolvers/zod";
import { ZodRawShape, z } from "zod";

type useFormSchemaTypes<T extends ZodRawShape> = {
  schema: z.ZodObject<T>;
};

function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      console.log({ key, value, schemashape: schema.shape });
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}

export function useFormSchema<T extends ZodRawShape>({
  schema,
}: useFormSchemaTypes<T>) {
  const resolver = zodResolver(schema);

  type values = z.infer<typeof schema>;
  const defaultValues = getDefaults(schema) as values;
  return { resolver, defaultValues };
}
