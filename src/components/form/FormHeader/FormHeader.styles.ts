export const formHeaderStyles = {
  container: "text-center mb-8",
  title: "text-4xl font-bold text-gray-900 mb-2",
  subtitle: "text-lg text-gray-600",
  progressBar: {
    container: "mt-4"
  }
} as const;

export const getFormHeaderClasses = {
  container: (className?: string) => 
    `${formHeaderStyles.container}${className ? ` ${className}` : ''}`,
  title: (titleClassName?: string) => 
    `${formHeaderStyles.title}${titleClassName ? ` ${titleClassName}` : ''}`,
  subtitle: (subtitleClassName?: string) => 
    `${formHeaderStyles.subtitle}${subtitleClassName ? ` ${subtitleClassName}` : ''}`
} as const;