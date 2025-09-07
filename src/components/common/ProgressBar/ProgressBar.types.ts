import { ProgressBarSize, ProgressBarColor } from './progressBarConsts';

export interface ProgressBarProps {
  percentage: number;
  showPercentage?: boolean;
  className?: string;
  barClassName?: string;
  textClassName?: string;
  size?: ProgressBarSize;
  color?: ProgressBarColor;
  animated?: boolean;
}