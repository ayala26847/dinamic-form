export interface ErrorMessageProps {
  message: string;
  title?: string;
  variant?: "inline" | "fullPage";
  showRetryButton?: boolean;
  onRetry?: () => void;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  buttonClassName?: string;
}
