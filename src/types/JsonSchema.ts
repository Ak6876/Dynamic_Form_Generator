import { z } from "zod";

export const JsonSchema = z
  .object({
    formTitle: z.string().min(1, "formTitle is required"),
    formDescription: z.string().optional(),
    fields: z
      .array(
        z.object({
          id: z.string().min(1, "Field ID is required"),
          type: z.enum(["text", "textarea", "select", "checkbox", "radio", "number", "email", "input"]),
          label: z.string().min(1, "Field label is required"),
          required: z.boolean().optional(),
          placeholder: z.string().optional(),
          options: z.array(z.string()).optional(),
        })
      )
      .min(1, "At least one field is required")
      .refine(
        (fields) => {
          const ids = fields.map((field) => field.id);
          return new Set(ids).size === ids.length; 
        },
        {
          message: "Field IDs must be unique",
          path: ["fields"], 
        }
      ),
  });
