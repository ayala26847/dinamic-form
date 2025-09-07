import React from 'react';
import { ErrorMessageProps } from './ErrorMessage.types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  title = 'Error',
  variant = 'inline',
  showRetryButton = false,
  onRetry,
  className = '',
  iconClassName = '',
  titleClassName = '',
  messageClassName = '',
  buttonClassName = ''
}) => {
  const defaultRetryHandler = () => {
    window.location.reload();
  };

  const handleRetry = onRetry || defaultRetryHandler;

  if (variant === 'fullPage') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dynamic Form</h1>
          </div>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-12">
            <div className="text-center">
              <div className={`text-red-500 mb-4 ${iconClassName}`}>
                <svg 
                  className="mx-auto h-12 w-12" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  role="img"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className={`text-lg font-medium text-gray-900 mb-2 ${titleClassName}`}>
                {title}
              </h3>
              <p className={`text-gray-600 mb-4 ${messageClassName}`}>
                {message}
              </p>
              {showRetryButton && (
                <button
                  onClick={handleRetry}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${buttonClassName}`}
                  type="button"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className={`flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 ${className}`} role="alert">
      <svg 
        className={`flex-shrink-0 inline w-4 h-4 me-3 ${iconClassName}`} 
        aria-hidden="true" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V4Zm.5 8.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z"/>
      </svg>
      <div>
        {title && title !== 'Error' && (
          <span className={`font-medium ${titleClassName}`}>{title}: </span>
        )}
        <span className={messageClassName}>{message}</span>
        {showRetryButton && (
          <button
            onClick={handleRetry}
            className={`ml-3 text-red-800 underline hover:no-underline focus:outline-none ${buttonClassName}`}
            type="button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;