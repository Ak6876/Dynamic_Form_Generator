import { useState } from "react";
import {FormSchema } from "../types/FormSchema";
import Form from "./Form"
import JsonEditor from "./JsonEditor"
import Error from "./Error";

interface ErrorProps {
  type: string;
  message: string; 
  path?: string[] | string | null;
}

const Editor: React.FC = () => { 
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [error, setError] = useState<ErrorProps | null>(null);

  const handleErrorUpdate = (errorMessage: ErrorProps | null) => {
    setError(errorMessage);
  }
  
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
    <div className="w-screen h-dvh flex flex-col lg:flex-row">
        <JsonEditor onChange={handleJsonChange} onErrorUpdate = {handleErrorUpdate}/>
        {error ? (
        <Error type={error.type} message={error.message} path={error.path} />
        ) :
        (((formSchema?.fields?.length && (formSchema?.fields?.length > 0)) || (formSchema?.formTitle || formSchema?.formDescription)) && <Form schema={formSchema} />)
        }
    </div>
  )
}

export default Editor