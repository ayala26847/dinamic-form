import React from 'react';
import { LoaderProps } from './Loader.types';
import { loaderConsts } from './LoaderConsts';



const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  message = loaderConsts.LoadingMessage,
  className = '',
  fullScreen = false
}) => {

 return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{message}</h1>
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

export default Loader;