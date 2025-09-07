import React from 'react';
import { FormHeaderProps } from './FormHeader.types';
import ProgressBar from '../../common/ProgressBar/ProgressBar';
import { formHeaderStyles, getFormHeaderClasses } from './FormHeader.styles';

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
    <div className={getFormHeaderClasses.container(className)}>
      <h1 className={getFormHeaderClasses.title(titleClassName)}>
        {title}
      </h1>
      {subtitle && (
        <p className={getFormHeaderClasses.subtitle(subtitleClassName)}>
          {subtitle}
        </p>
      )}
      {showProgressBar && (
        <ProgressBar
          percentage={progressPercentage}
          className={formHeaderStyles.progressBar.container}
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