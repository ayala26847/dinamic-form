import { ProgressBarProps } from '../../common/ProgressBar/ProgressBar.types';

export interface FormHeaderProps {
  title: string;
  subtitle?: string;
  showProgressBar?: boolean;
  progressPercentage?: number;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  progressBarProps?: Partial<Omit<ProgressBarProps, 'percentage'>>;
}