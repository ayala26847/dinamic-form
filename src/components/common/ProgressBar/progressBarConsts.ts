export const PROGRESS_BAR_SIZE_CLASSES = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
} as const;

export const PROGRESS_BAR_COLOR_CLASSES = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-600',
  purple: 'bg-purple-600'
} as const;

export type ProgressBarSize = keyof typeof PROGRESS_BAR_SIZE_CLASSES;
export type ProgressBarColor = keyof typeof PROGRESS_BAR_COLOR_CLASSES;