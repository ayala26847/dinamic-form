export const formFieldStyles = {
  container: "space-y-2",
  label: {
    base: "block text-sm font-semibold text-gray-700",
    required: "text-red-500 ml-1"
  },
  inputWrapper: "relative",
  input: {
    base: "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2",
    normal: "border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white",
    error: "border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50",
    disabled: "opacity-50 cursor-not-allowed"
  },
  textarea: {
    additional: "min-h-[120px] resize-vertical"
  },
  errorIcon: {
    container: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none",
    icon: "h-5 w-5 text-red-500"
  },
  errorMessages: {
    container: "space-y-1",
    message: "flex items-center text-sm text-red-600",
    icon: "h-4 w-4 mr-2 flex-shrink-0"
  }
} as const;

export const getFormFieldClasses = {
  baseInput: (hasErrors: boolean, disabled: boolean, className?: string) => {
    let classes = formFieldStyles.input.base;
    
    if (hasErrors) {
      classes += ` ${formFieldStyles.input.error}`;
    } else {
      classes += ` ${formFieldStyles.input.normal}`;
    }
    
    if (disabled) {
      classes += ` ${formFieldStyles.input.disabled}`;
    }
    
    if (className) {
      classes += ` ${className}`;
    }
    
    return classes;
  },
  
  textarea: (hasErrors: boolean, disabled: boolean, className?: string) => {
    const baseClasses = getFormFieldClasses.baseInput(hasErrors, disabled, className);
    return `${baseClasses} ${formFieldStyles.textarea.additional}`;
  }
} as const;