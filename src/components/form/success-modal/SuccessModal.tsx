import { CheckCircle, Download, X } from 'lucide-react';
import React from 'react';
import { SuccessModalProps } from './SuccessModal.types';
import { successModalStyles, getSuccessModalClasses } from './SuccessModal.styles';


const SuccessModal: React.FC<SuccessModalProps> = ({
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
    <div className={successModalStyles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={getSuccessModalClasses.modal(className)}>
        {/* Header */}
        <div className={successModalStyles.header.container}>
          <div className={successModalStyles.header.titleWrapper}>
            <CheckCircle className={successModalStyles.header.icon} aria-hidden="true" />
            <h2 id="modal-title" className={successModalStyles.header.title}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={successModalStyles.header.closeButton}
            aria-label="Close modal"
          >
            <X className={successModalStyles.header.closeIcon} />
          </button>
        </div>
        
        {/* Body */}
        <div className={successModalStyles.body.container}>
          {message && (
            <p className={successModalStyles.body.message}>{message}</p>
          )}
          
          {showFormData && (
            <>
              <div className={successModalStyles.body.dataSection.headerWrapper}>
                <h3 className={successModalStyles.body.dataSection.title}>
                  Submitted Data:
                </h3>
                {allowDataExport && (
                  <button
                    onClick={handleExportData}
                    className={successModalStyles.body.dataSection.exportButton}
                    title="Export data as JSON"
                  >
                    <Download className={successModalStyles.body.dataSection.exportIcon} />
                    Export
                  </button>
                )}
              </div>
              
              <div className={successModalStyles.body.dataContainer}>
                {Object.entries(formData).map(([key, value]) => (
                  <div 
                    key={key} 
                    className={successModalStyles.body.dataItem.container}
                  >
                    <span className={successModalStyles.body.dataItem.key}>{key}:</span>
                    <span className={successModalStyles.body.dataItem.value} 
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
        <div className={successModalStyles.footer.container}>
          <button
            onClick={onClose}
            className={successModalStyles.footer.closeButton}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;