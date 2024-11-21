import {useState } from "react";
import {FormSchema } from "../types/FormSchema";
import Form from "./Form"
import JsonEditor from "./JsonEditor"

const Editor: React.FC = () => { 
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  
  const handleJsonChange = (json: string) => {
    try {
      const parsedSchema: FormSchema = JSON.parse(json);
      setFormSchema(parsedSchema);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };
  
  return (
    <div className="w-full px-4 py-2 flex gap-1 flex-col md:flex-row">
        <JsonEditor onChange={handleJsonChange} />
        {((formSchema?.fields?.length && (formSchema?.fields?.length > 0)) || (formSchema?.formTitle || formSchema?.formDescription)) && <Form schema={formSchema} />}
    </div>
  )
}

export default Editor