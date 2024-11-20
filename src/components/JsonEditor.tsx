
import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { FormSchema } from "../types/FormSchema";

interface JsonEditorProps {
  onChange: (json: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onChange }) => {

  const editorRef = useRef<any>(null);

  const validateJsonContainsField = (json: string): boolean => {
    try {
      const parsedJson: FormSchema = JSON.parse(json);
      return Object.entries(parsedJson).some(
        ([key, value]) => key.trim().length > 0 && value !== undefined && value !== null
      );
    } catch {
      return false;
    }
  }; 
  
  const handleEditorChange = (value?: string) => {
    if (!value) return;

    const isValid = validateJsonContainsField(value);
    if (isValid) {
      onChange(value);
    } else {
      console.warn("Invalid JSON: Must contain at least one field.");
    }
  };


  return (
    <div className="container">
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