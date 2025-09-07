import React from 'react';
import { FormHeaderProps } from './FormHeader.types';
import ProgressBar from '../../common/ProgressBar/ProgressBar';

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  subtitle,
  showProgressBar = false,
  progressPercentage = 0,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  progressBarProps = {}
}) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className={`text-4xl font-bold text-gray-900 mb-2 ${titleClassName}`}>
        {title}
      </h1>
      {subtitle && (
        <p className={`text-lg text-gray-600 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
      {showProgressBar && (
        <ProgressBar
          percentage={progressPercentage}
          className="mt-4"
          showPercentage={true}
          size="md"
          color="blue"
          animated={true}
          {...progressBarProps}
        />
      )}
    </div>
  );
};

export { FormHeader };