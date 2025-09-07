export const errorMessageStyles = {
  fullPage: {
    container: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8",
    wrapper: "max-w-2xl mx-auto",
    header: {
      container: "text-center mb-8",
      title: "text-4xl font-bold text-gray-900 mb-2"
    },
    card: "bg-white shadow-xl rounded-2xl overflow-hidden p-12",
    content: {
      container: "text-center",
      iconWrapper: "text-red-500 mb-4",
      icon: "mx-auto h-12 w-12",
      title: "text-lg font-medium text-gray-900 mb-2",
      message: "text-gray-600 mb-4",
      button: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    }
  },
  inline: {
    container: "flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50",
    icon: "flex-shrink-0 inline w-4 h-4 me-3",
    titleSpan: "font-medium",
    button: "ml-3 text-red-800 underline hover:no-underline focus:outline-none"
  }
} as const;

export const getErrorMessageClasses = {
  fullPageContainer: (className?: string) => 
    `${errorMessageStyles.fullPage.container}${className ? ` ${className}` : ''}`,
  fullPageIconWrapper: (iconClassName?: string) => 
    `${errorMessageStyles.fullPage.content.iconWrapper}${iconClassName ? ` ${iconClassName}` : ''}`,
  fullPageTitle: (titleClassName?: string) => 
    `${errorMessageStyles.fullPage.content.title}${titleClassName ? ` ${titleClassName}` : ''}`,
  fullPageMessage: (messageClassName?: string) => 
    `${errorMessageStyles.fullPage.content.message}${messageClassName ? ` ${messageClassName}` : ''}`,
  fullPageButton: (buttonClassName?: string) => 
    `${errorMessageStyles.fullPage.content.button}${buttonClassName ? ` ${buttonClassName}` : ''}`,
  inlineContainer: (className?: string) => 
    `${errorMessageStyles.inline.container}${className ? ` ${className}` : ''}`,
  inlineIcon: (iconClassName?: string) => 
    `${errorMessageStyles.inline.icon}${iconClassName ? ` ${iconClassName}` : ''}`,
  inlineTitleSpan: (titleClassName?: string) => 
    `${errorMessageStyles.inline.titleSpan}${titleClassName ? ` ${titleClassName}` : ''}`,
  inlineButton: (buttonClassName?: string) => 
    `${errorMessageStyles.inline.button}${buttonClassName ? ` ${buttonClassName}` : ''}`
} as const;