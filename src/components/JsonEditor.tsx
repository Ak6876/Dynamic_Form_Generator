
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { JsonSchema } from "../types/JsonSchema";

interface JsonEditorProps {
  onChange: (json: string | null | undefined, checkValid : boolean) => void;
  onErrorUpdate: (errorMessage: string | null) => void ;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange, onErrorUpdate }) => {

  const editorRef = useRef<any>(null);

  const validateJsonContainsField = (json: string): boolean => {
    try {
      const parsedJson: typeof JsonSchema = json && JSON.parse(json);
      return Object.entries(parsedJson).some(
        ([key, value]) => key.trim().length > 0 && value !== undefined && value !== null
      );
    } catch {
      return false;
    }
  }; 

  const validateJsonSchema = (json: string): boolean => {
    try {
      const parsedJson = JSON.parse(json);
      JsonSchema.parse(parsedJson);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        onErrorUpdate("Schema Validation Errors: " + error.errors.map(e => e.message).join(", "));
      } else {
        onErrorUpdate("Invalid JSON format.");
      }
      return false;
    }
  };

  const handleEditorChange = (value?: string | null | undefined) => {
    
    if (!value) {
      onErrorUpdate("Empty JSON input.");
      onChange(value, false);
      return;
    }

    const isValid = value && validateJsonContainsField(value) && validateJsonSchema(value);
    
    if(!validateJsonContainsField(value)){
      onErrorUpdate("No fields found in JSON.");
      onChange(value, false);
      return;
    }

    if (isValid) {
      onErrorUpdate(null);
      onChange(value, true);
    }else { 
      (value || value?.length === 0) && onChange( value, false )
    }

  };

  return (
    <div className="min-h-screen w-11/20 max-w-full flex flex-col py-1 px-2">
      <header className="w-full px-4 border-2 border-b-0 border-gray-400 rounded-t-lg h-10 bg-gray-100 flex items-center">
        <p className="text-black base cursor-pointer" > Json Schema </p>
      </header>
      <main className="border-2 border-gray-400 rounded-md rounded-t-none border-t-0 overlay w-full h-full shadow-4xl">
        <Editor
          height={`100%`}
          width={`100%`}
          language={"json"}
          defaultValue={`{}`}
          onChange={handleEditorChange}
          onMount={(editor) => (editorRef.current = editor)}
        />
      </main>
    </div>
  )
}

export default JsonEditor