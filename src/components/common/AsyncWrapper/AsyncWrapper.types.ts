export interface AsyncWrapperProps<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  loadingMessage?: string;
  errorTitle?: string;
  className?: string;
  children: (data: T) => React.ReactNode;
}