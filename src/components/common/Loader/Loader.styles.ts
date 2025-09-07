export const loaderStyles = {
  container: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8",
  wrapper: "max-w-2xl mx-auto",
  header: {
    container: "text-center mb-8",
    title: "text-4xl font-bold text-gray-900 mb-2"
  },
  card: "bg-white shadow-xl rounded-2xl overflow-hidden p-12",
  content: {
    container: "flex flex-col items-center",
    spinner: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600",
    message: "mt-4 text-gray-600"
  }
} as const;

export const getLoaderClasses = {
  container: (className?: string) => 
    `${loaderStyles.container}${className ? ` ${className}` : ''}`
} as const;