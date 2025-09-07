
export interface SuccessModalProps {
    isOpen: boolean;
    formData: FormData;
    onClose: () => void;
    title?: string;
    message?: string;
    showFormData?: boolean;
    allowDataExport?: boolean;
    className?: string;
  }