import {useState } from "react";
import {FormSchema } from "../types/FormSchema";
import Form from "./Form"
import JsonEditor from "./JsonEditor"

const Editor: React.FC = () => { 
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  
  const handleJsonChange = (json: string | null | undefined, checkValid : boolean) => {
      if(checkValid)
      {
        const parsedSchema: FormSchema = json && JSON.parse(json);
        {parsedSchema && setFormSchema(parsedSchema)};
      }
      else
      {
        setFormSchema(null);
      }  
  };
  
  return (
    <div className="w-full lg:h-full px-4 py-2 flex gap-4 flex-col lg:flex-row">
        <JsonEditor onChange={handleJsonChange} />
        {((formSchema?.fields?.length && (formSchema?.fields?.length > 0)) || (formSchema?.formTitle || formSchema?.formDescription)) && <Form schema={formSchema} />}
    </div>
  )
}

export default Editor