import React from 'react';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { AsyncWrapperProps } from './AsyncWrapper.types';



export function AsyncWrapper<T>({
  data,
  isLoading,
  error,
  onRetry,
  loadingMessage = "Loading...",
  errorTitle = "Error",
  className = "",
  children,
}: AsyncWrapperProps<T>) {
  if (isLoading) {
    return <Loader message={loadingMessage} />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        title={errorTitle}
        variant="fullPage"
        showRetryButton={!!onRetry}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (!data) {
    return null;
  }

  return <>{children(data)}</>;
}