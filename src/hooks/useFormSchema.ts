import { zodResolver } from "@hookform/resolvers/zod";
import { ZodRawShape, z } from "zod";

type useFormSchemaTypes<T extends ZodRawShape> = {
  schema: z.ZodObject<T>;
};
export function useFormSchema<T extends ZodRawShape>({
  schema,
}: useFormSchemaTypes<T>) {
  const resolver = zodResolver(schema);
  return { resolver };
}
