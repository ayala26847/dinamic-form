
export interface ValidationRule {
    value: any;
    error_message: string;
  }
  
  export interface FieldRules {
    required?: ValidationRule;
    min?: ValidationRule;
    max?: ValidationRule;
    regex?: ValidationRule;
  }
  
  export interface SelectOption {
    key: string;
    value: string;
  }
  
  export interface Field {
    type: 'input' | 'input_number' | 'select' | 'textarea';
    label: string;
    options?: SelectOption[];
    rules: FieldRules;
  }
  
  export interface FormSection {
    title: string;
    fields: Field[];
  }
  
  export interface FormData {
    [key: string]: string | number;
  }
  
  export interface FieldErrors {
    [key: string]: string[];
  }
  
  // API related types
  export interface ApiResponse<T> {
    data: T;
    status: 'success' | 'error';
    message?: string;
  }
  export interface Schema {
  fields: Field[];
}