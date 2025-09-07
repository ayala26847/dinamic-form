import { Field } from "../../../types/form/form.types";

export interface FormFieldProps {
  field: Field;
  value: string | number;
  errors: string[];
  onChange: (value: string | number) => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  testId?: string;
}