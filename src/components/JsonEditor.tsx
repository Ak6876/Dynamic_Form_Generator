
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { JsonSchema } from "../types/JsonSchema";

interface ErrorProps {
  type: string;
  message: string; 
  path?: string[]| string | null;
}

interface JsonEditorProps {
  onChange: (json: string | null | undefined, checkValid : boolean) => void;
  onErrorUpdate: (errorMessage: ErrorProps | null) => void ;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange, onErrorUpdate }) => {

  const editorRef = useRef<any>(null);

  const validateJsonContainsField = (parsedJson: any): boolean => {
    try {
      return Object.entries(parsedJson).some(
        ([key, value]) => key.trim().length > 0 && value !== undefined && value !== null
      );
    } catch {
      return false;
    }
  }; 

  // const validateJsonSchema = (json: string): boolean => {
  //   try {
  //     const parsedJson = JSON.parse(json);
  //     JsonSchema.parse(parsedJson);
  //     return true;
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       onErrorUpdate("Schema Validation Errors: " + error.errors.map(e => e.message).join(", "));
  //     } else {
  //       onErrorUpdate("Invalid JSON format.");
  //     }
  //     return false;
  //   }
  // };

  const handleEditorChange = (value?: string | null | undefined) => {
    if (!value) {
      onErrorUpdate({ type: "Validation Error", message: "Empty JSON input." });
      onChange(value, false);
      return;
    }

    try {
      const parsedJson : typeof JsonSchema = value && JSON.parse(value);
      JsonSchema.parse(parsedJson);
      
      const isValid = validateJsonContainsField(parsedJson);
      
      if (isValid) {
        onErrorUpdate(null);
        onChange(value, true);
      }else{
        onChange(value, false);
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error);
        onErrorUpdate({ type: "Validation Error", message: "JSON Schema Validation Errors, " + error.errors.map(e => e.message).join(", "), path: error.errors.flatMap((e) => e.path.map(String)), });
      } else {
        onErrorUpdate({ type: "Syntax Error", message: "Invalid JSON format or no fields found in JSON.", path: error instanceof Error ? error.message : null });
      }
      onChange( value, false );
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