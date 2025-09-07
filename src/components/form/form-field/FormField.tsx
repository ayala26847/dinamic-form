
import { AlertCircle } from 'lucide-react';
import React from 'react';
import { FormFieldProps } from './FormField.types';



export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  errors,
  onChange,
  className = '',
  disabled = false,
  autoFocus = false,
  placeholder,
  testId
}) => {
  const hasErrors = errors.length > 0;
  const fieldId = field.label.toLowerCase().replace(/\s+/g, '-');
  const finalPlaceholder = placeholder || `Enter ${field.label.toLowerCase()}`;

  const baseInputClasses = `w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
    hasErrors 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 bg-white'
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const renderField = () => {
    switch (field.type) {
      case 'input':
        return (
          <input
            id={fieldId}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
            placeholder={finalPlaceholder}
            disabled={disabled}
            autoFocus={autoFocus}
            data-testid={testId}
          />
        );

      case 'input_number':
        return (
          <input
            id={fieldId}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
            className={baseInputClasses}
            placeholder={finalPlaceholder}
            disabled={disabled}
            autoFocus={autoFocus}
            data-testid={testId}
          />
        );

      case 'select':
        return (
          <select
            id={fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
            disabled={disabled}
            autoFocus={autoFocus}
            data-testid={testId}
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInputClasses} min-h-[120px] resize-vertical`}
            placeholder={finalPlaceholder}
            disabled={disabled}
            autoFocus={autoFocus}
            data-testid={testId}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="block text-sm font-semibold text-gray-700">
        {field.label}
        {field.rules.required?.value && (
          <span className="text-red-500 ml-1" aria-label="Required field">*</span>
        )}
      </label>
      
      <div className="relative">
        {renderField()}
        {hasErrors && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>

      {hasErrors && (
        <div className="space-y-1" role="alert">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};