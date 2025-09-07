export const successModalStyles = {
  overlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
  modal: "bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto",
  header: {
    container: "flex justify-between items-center p-6 border-b border-gray-200",
    titleWrapper: "flex items-center",
    icon: "h-8 w-8 text-green-500 mr-3",
    title: "text-2xl font-bold text-gray-900",
    closeButton: "text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100",
    closeIcon: "h-6 w-6"
  },
  body: {
    container: "p-6",
    message: "text-gray-600 mb-6",
    dataSection: {
      headerWrapper: "flex items-center justify-between mb-4",
      title: "text-lg font-semibold text-gray-800",
      exportButton: "flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors",
      exportIcon: "h-4 w-4 mr-1"
    },
    dataContainer: "bg-gray-50 rounded-lg p-4 space-y-3",
    dataItem: {
      container: "flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0",
      key: "font-medium text-gray-700",
      value: "text-gray-900 max-w-xs truncate text-right"
    }
  },
  footer: {
    container: "flex justify-end gap-3 p-6 border-t border-gray-200",
    closeButton: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  }
} as const;

export const getSuccessModalClasses = {
  modal: (className?: string) => 
    `${successModalStyles.modal}${className ? ` ${className}` : ''}`
} as const;