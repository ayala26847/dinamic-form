export const progressBarStyles = {
  container: "w-full",
  track: "w-full bg-gray-200 rounded-full",
  bar: {
    base: "rounded-full",
    animated: "transition-all duration-300"
  },
  text: {
    container: "mt-2 text-sm text-gray-500 text-center"
  }
} as const;

export const getProgressBarClasses = {
  container: (className?: string) => 
    `${progressBarStyles.container}${className ? ` ${className}` : ''}`,
  bar: (colorClass: string, sizeClass: string, animated: boolean, barClassName?: string) => {
    let classes = `${colorClass} ${sizeClass} ${progressBarStyles.bar.base}`;
    
    if (animated) {
      classes += ` ${progressBarStyles.bar.animated}`;
    }
    
    if (barClassName) {
      classes += ` ${barClassName}`;
    }
    
    return classes;
  },
  text: (textClassName?: string) => 
    `${progressBarStyles.text.container}${textClassName ? ` ${textClassName}` : ''}`
} as const;