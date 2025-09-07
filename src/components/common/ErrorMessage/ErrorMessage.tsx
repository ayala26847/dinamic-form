import React from "react";
import { ErrorMessageProps } from "./ErrorMessage.types";
import { errorMessageConsts } from "./ErrorMessageConsts";
import { errorMessageStyles, getErrorMessageClasses } from "./ErrorMessage.styles";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = errorMessageConsts.ErrDefaultorMessage,
  title = errorMessageConsts.titleDefault,
  variant = errorMessageConsts.variant,
  showRetryButton = false,
  onRetry,
  className = "",
  iconClassName = "",
  titleClassName = "",
  messageClassName = "",
  buttonClassName = "",
}) => {
  const defaultRetryHandler = () => {
    window.location.reload();
  };

  const handleRetry = onRetry || defaultRetryHandler;

  if (variant === "fullPage") {
    return (
      <div className={getErrorMessageClasses.fullPageContainer(className)}>
        <div className={errorMessageStyles.fullPage.wrapper}>
          <div className={errorMessageStyles.fullPage.header.container}>
            <h1 className={errorMessageStyles.fullPage.header.title}>
              Dynamic Form
            </h1>
          </div>
          <div className={errorMessageStyles.fullPage.card}>
            <div className={errorMessageStyles.fullPage.content.container}>
              <div className={getErrorMessageClasses.fullPageIconWrapper(iconClassName)}>
                <svg
                  className={errorMessageStyles.fullPage.content.icon}
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
              <h3 className={getErrorMessageClasses.fullPageTitle(titleClassName)}>
                {title}
              </h3>
              <p className={getErrorMessageClasses.fullPageMessage(messageClassName)}>
                {message}
              </p>
              {showRetryButton && (
                <button
                  onClick={handleRetry}
                  className={getErrorMessageClasses.fullPageButton(buttonClassName)}
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
    <div className={getErrorMessageClasses.inlineContainer(className)} role="alert">
      <svg
        className={getErrorMessageClasses.inlineIcon(iconClassName)}
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V4Zm.5 8.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" />
      </svg>
      <div>
        {title && title !== "Error" && (
          <span className={getErrorMessageClasses.inlineTitleSpan(titleClassName)}>{title}: </span>
        )}
        <span className={messageClassName}>{message}</span>
        {showRetryButton && (
          <button
            onClick={handleRetry}
            className={getErrorMessageClasses.inlineButton(buttonClassName)}
            type="button"
          >
            {errorMessageConsts.tryBrnText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
