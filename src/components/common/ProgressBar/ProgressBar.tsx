import React from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import { PROGRESS_BAR_COLOR_CLASSES, PROGRESS_BAR_SIZE_CLASSES } from './progressBarConsts';
import { progressBarStyles, getProgressBarClasses } from './ProgressBar.styles';


const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  showPercentage = true,
  className = '',
  barClassName = '',
  textClassName = '',
  size = 'md',
  color = 'blue',
  animated = true
}) => {
  // Ensure percentage is within 0-100 range
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className={getProgressBarClasses.container(className)}>
      <div className={`${progressBarStyles.track} ${PROGRESS_BAR_SIZE_CLASSES[size]}`}>
        <div
          className={getProgressBarClasses.bar(PROGRESS_BAR_COLOR_CLASSES[color], PROGRESS_BAR_SIZE_CLASSES[size], animated, barClassName)}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${clampedPercentage}%`}
        />
      </div>
      {showPercentage && (
        <div className={getProgressBarClasses.text(textClassName)}>
          {clampedPercentage}% Complete
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
