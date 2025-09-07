import { FormData, Schema } from "../../../types/form/form.types";

export interface DynamicFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  submitButtonText?: string;
  showProgressBar?: boolean;
  enableAutoSave?: boolean;
  className?: string;
}

export interface DynamicFormState {
  isLoading: boolean;
  error: string | null;
  showSuccessModal: boolean;
  isSubmitting: boolean;
}