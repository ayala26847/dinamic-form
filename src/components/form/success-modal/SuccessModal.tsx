import React from 'react';
import { CheckCircle, X, Download } from 'lucide-react';
import { SuccessModalProps } from './SuccessModal.types';
import { FormData } from '../../../types/form/form.types';


export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  formData,
  onClose,
  title = "Form Submitted Successfully!",
  message = "Your information has been received and processed.",
  showFormData = true,
  allowDataExport = false,
  className = ""
}) => {
  if (!isOpen) return null;

  const handleExportData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" aria-hidden="true" />
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          {message && (
            <p className="text-gray-600 mb-6">{message}</p>
          )}
          
          {showFormData && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Submitted Data:
                </h3>
                {allowDataExport && (
                  <button
                    onClick={handleExportData}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    title="Export data as JSON"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {Object.entries(formData).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span 
                      className="text-gray-900 max-w-xs truncate text-right" 
                      title={String(value)}
                    >
                      {String(value) || 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};