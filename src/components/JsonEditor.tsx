
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { JsonSchema } from "../types/JsonSchema";

interface JsonEditorProps {
  onChange: (json: string | null | undefined, checkValid : boolean) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange }) => {

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
        console.error("Schema Validation Errors:", error.errors);
      } else {
        console.error("Invalid JSON format:", error);
      }
      return false;
    }
  };

  const handleEditorChange = (value?: string | null | undefined) => {
      const isValid = value && validateJsonContainsField(value) && validateJsonSchema(value);
      if (isValid) {
        onChange(value, true);
      }else{
        (value || value?.length === 0) && onChange( value, false );
      }
  };


  return (
    <div className="container lg:w-[50vw] w-full">
      <header className="w-full px-4 border-2 rounded-t-lg h-10 bg-gray-100 flex items-center -z-4">
        <p className="text-black base cursor-pointer" > Json Schema </p>
      </header>
      <main className="border-2 border-t-0 overlay w-full z-10 shadow-4xl">
        <Editor
          height={`70vh`}
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