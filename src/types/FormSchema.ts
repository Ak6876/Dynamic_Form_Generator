type InputType = "text" | "email" | "number" | "textarea" | "checkbox" | "radio" | "select";

interface FormField {
  id: string; 
  type: InputType; 
  label: string; 
  required: boolean; 
  placeholder?: string; 
  options?: string[]; 
  defaultValue?: string | number | readonly string[] | undefined; 
}

export interface FormSchema {
  formTitle: string; 
  formDescription?: string; 
  fields: FormField[]; 
}
