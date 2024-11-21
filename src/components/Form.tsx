
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../types/FormSchema";

interface FormProps {
  schema: FormSchema;
}

const Form: React.FC<FormProps> = ({ schema }) => {

  const createZodSchema = (fields: FormSchema["fields"]) => {
    const schema: Record<string, any> = {};
    fields?.forEach((field) => {
      if (field.required) {
        if (field.type === "select") {
          schema[field.id] = z.string().min(1, `${field.label} is required`);
        } else if (field.type === "checkbox") {
          schema[field.id] = z.boolean().refine((val) => val, `${field.label} must be checked`);
        } else {
          schema[field.id] = z.string().min(1, `${field.label} is required`);
        }
      } else {
        schema[field.id] = field.type === "checkbox" ? z.boolean().optional() : z.string().optional();
      }
    });
    return z.object(schema);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createZodSchema(schema.fields)),
  });

const onSubmit = (data: any) => {
  console.log("Form Data:", data);
};

  return (
    <div className="container h-full">
      <header className="sticky w-full px-4 border-2 rounded-t-lg h-10 bg-gray-100 flex items-center z-20">
        <a className="base cursor-pointer" >Form</a>
      </header>
      <main className={`overflow-hidden w-full shadow-4xl p-4`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <h2 className="text-xl font-bold">{schema?.formTitle}</h2>

          {schema.formDescription && <p>{schema?.formDescription}</p>}

          {schema?.fields && schema?.fields.map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block font-medium mb-1">
                {field.label}
              </label>
              {field.type === "textarea" && (
                <textarea
                  id={field.id}
                  {...register(field.id)}
                  placeholder={field.placeholder}
                  className={`w-full px-3 py-2 border rounded ${errors[field.id] ? "border-red-500" : "border-gray-300"
                    }`}
                />
              )}
              {field.type === "select" && field.options && (
                <select
                  id={field.id}
                  {...register(field.id)}
                  defaultValue=""
                  className={`w-full px-3 py-2 border rounded ${errors[field.id] ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "checkbox" && (
                <input
                  id={field.id}
                  type="checkbox"
                  {...register(field.id)}
                  className={`h-4 w-4 ${errors[field.id] ? "border-red-500" : "border-gray-300"
                    }`}
                />
              )}
              { field.type &&
                field.type !== "textarea" &&
                field.type !== "select" &&
                field.type !== "checkbox" && 
                field.id && (
                  <input
                    id={field.id}
                    type={field.type}
                    {...register(field.id)}
                    placeholder={field.placeholder}
                    className={`w-full px-3 py-2 border rounded ${errors[field.id] ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                )}
              {errors[field.id] && (
                <p className="text-red-500 text-sm">{errors[field.id]?.message as string}</p>
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </main>
    </div>
  )
}

export default Form