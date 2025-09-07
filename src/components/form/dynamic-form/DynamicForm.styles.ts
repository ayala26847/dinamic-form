export const dynamicFormStyles = {
  container: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8",
  wrapper: "max-w-2xl mx-auto",
  formCard: "bg-white shadow-xl rounded-2xl overflow-hidden",
  formContent: "p-8",
  section: {
    container: "mb-8 last:mb-6",
    title: "text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200",
    fieldsGrid: "grid gap-6"
  },
  submitButton: {
    container: "flex justify-end pt-6 border-t border-gray-200",
    base: "px-8 py-3 rounded-lg font-semibold transition-all duration-200",
    enabled: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
    submitting: "opacity-50"
  },
  loading: {
    spinner: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2",
    container: "flex items-center"
  }
} as const;

export const getDynamicFormClasses = {
  container: (className?: string) => 
    `${dynamicFormStyles.container}${className ? ` ${className}` : ''}`,
  submitButton: (isValid: boolean, isSubmitting: boolean) => {
    let classes = dynamicFormStyles.submitButton.base;
    if (isValid && !isSubmitting) {
      classes += ` ${dynamicFormStyles.submitButton.enabled}`;
    } else {
      classes += ` ${dynamicFormStyles.submitButton.disabled}`;
    }
    if (isSubmitting) {
      classes += ` ${dynamicFormStyles.submitButton.submitting}`;
    }
    return classes;
  }
} as const;