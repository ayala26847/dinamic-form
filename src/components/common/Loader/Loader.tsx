import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16',
  lg: 'h-24 w-24'
};

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  message = 'Loading...',
  className = '',
  fullScreen = false
}) => {
  const containerClasses = fullScreen
    ? 'min-h-screen bg-gray-50 flex items-center justify-center'
    : 'flex items-center justify-center p-4';

 return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dynamic Form</h1>
          </div>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              <p className="mt-4 text-gray-600">{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
};