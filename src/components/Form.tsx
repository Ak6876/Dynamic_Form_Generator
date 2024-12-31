
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../types/FormSchema";

interface FormProps {
  schema: FormSchema;
}

interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

const Form: React.FC<FormProps> = ({ schema }) => {

  const createZodSchema = (fields: FormSchema["fields"]) => {
    const schema: Record<string, any> = {};
    fields?.forEach((field) => {
      if (field.required) {
        if (field.type === "select") {
          schema[field.id] = z.string().min(1, `${field.label} is required`);
        } else if (field.type === "checkbox" || field.type === "radio") {
          schema[field.id] = z.boolean().refine((val) => val, `${field.label} must be checked`);
        } else {
          schema[field.id] = z.string().min(1, `${field.label} is required`);
        }
      } else {
        schema[field.id] = field.type === "checkbox" || field.type === "radio" ? z.boolean().optional() : z.string().optional();
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

  

  const renderField = (field: Field) => {
    switch (field.type) {
    case 'textarea':
        return (
          <div  className="mb-4">
          <label htmlFor={field.id} className="block font-medium mb-1">
            {field.label}
          </label>
          {field.type === "textarea" && (
          <textarea
          id={field.id}
          {...register(field.id)}
          placeholder={field.placeholder}
          className={`w-full px-3 py-2 border rounded ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
          />
        )
      }
      </div> 
    )

    case 'select': return (
      <div  className="mb-4">
          <label htmlFor={field.id} className="block font-medium mb-1">
            {field.label}
          </label>
    {field.options && (
      <select
        id={field.id}
        {...register(field.id)}
        defaultValue=""
        className={`w-full px-3 py-2 rounded border ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
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
    </div>
    )

    case 'radio':
        return (
          <div className="flex items-center" >
            <input type="radio" id={field.id} {...register(field.id)} className={`mr-2 h-4 w-4 ${errors[field.id] ? "border-red-500" : "border-gray-300"}`} />
            <label htmlFor={field.id} className="block font-medium">{field.label}</label>
          </div>
        );

    case 'checkbox':
        return (
          <div className="flex items-center" >
            <input type="checkbox" id={field.id} {...register(field.id)} className={`mr-2 h-4 w-4 ${errors[field.id] ? "border-red-500" : "border-gray-300"}`} />
            <label htmlFor={field.id} className="block font-medium">{field.label}</label>
          </div>
        );
      default:
        return (
          <div  className="mb-4">
            <label htmlFor={field.id} className="block font-medium mb-1">
              {field.label}
            </label>  
              <input
                id={field.id}
                type={field.type}
                {...register(field.id)}
                placeholder={field.placeholder}
                className={`w-full px-3 py-2 border rounded ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
              />
          </div>
          )
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col py-1 pr-1">
      <header className="sticky w-full px-4 border-2 border-b-0 border-gray-400 rounded-t-lg h-10 bg-gray-100 flex items-center z-20">
        <a className="text-black-100 base cursor-pointer" >Form</a>
      </header>
      <main className={` w-full h-full p-4 border-2 border-gray-400 rounded-md rounded-t-none border-t-0 overflow-y-auto`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <h2 className="text-xl font-bold">{schema?.formTitle}</h2>

          {schema.formDescription && <p>{schema?.formDescription}</p>}

          {schema?.fields && schema?.fields.map((field) => (
            <div key={field.id}>
                {field.id && renderField(field)}
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