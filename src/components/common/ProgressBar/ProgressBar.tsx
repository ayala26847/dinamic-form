import React from 'react';
import { ProgressBarProps } from './ProgressBar.types';
import { PROGRESS_BAR_COLOR_CLASSES, PROGRESS_BAR_SIZE_CLASSES } from './progressBarConsts';


export const ProgressBar: React.FC<ProgressBarProps> = ({
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
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${PROGRESS_BAR_SIZE_CLASSES[size]}`}>
        <div
          className={`${PROGRESS_BAR_COLOR_CLASSES[color]} ${PROGRESS_BAR_SIZE_CLASSES[size]} rounded-full ${
            animated ? 'transition-all duration-300' : ''
          } ${barClassName}`}
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${clampedPercentage}%`}
        />
      </div>
      {showPercentage && (
        <div className={`mt-2 text-sm text-gray-500 text-center ${textClassName}`}>
          {clampedPercentage}% Complete
        </div>
      )}
    </div>
  );
};

