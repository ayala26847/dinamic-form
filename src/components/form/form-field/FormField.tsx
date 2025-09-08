import { AlertCircle } from "lucide-react";
import React from "react";
import { formFieldStyles, getFormFieldClasses } from "./FormField.styles";
import { FormFieldProps } from "./FormField.types";
import { formFieldConsts } from "./FormFieldConsts";

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  errors,
  onChange,
  className = "",
  disabled = false,
  autoFocus = false,
  placeholder,
  testId,
}) => {
  const hasErrors = errors.length > 0;
  const fieldId = field.label.toLowerCase().replace(/\s+/g, "-");
  const finalPlaceholder = placeholder || `Enter ${field.label.toLowerCase()}`;

  const baseInputClasses = getFormFieldClasses.baseInput(
    hasErrors,
    disabled,
    className
  );

  const renderField = () => {
    switch (field.type) {
      case "input":
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

      case "input_number":
        return (
          <input
            id={fieldId}
            type="number"
            value={value}
            onChange={(e) =>
              onChange(e.target.value ? Number(e.target.value) : "")
            }
            className={baseInputClasses}
            placeholder={finalPlaceholder}
            disabled={disabled}
            autoFocus={autoFocus}
            data-testid={testId}
          />
        );

      case "select":
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

      case "textarea":
        return (
          <textarea
            id={fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={getFormFieldClasses.textarea(
              hasErrors,
              disabled,
              className
            )}
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
    <div className={formFieldStyles.container}>
      <label htmlFor={fieldId} className={formFieldStyles.label.base}>
        {field.label}
        {field.rules.required?.value && (
          <span
            className={formFieldStyles.label.required}
            aria-label={formFieldConsts.requiredField}
          >
            *
          </span>
        )}
      </label>

      <div className={formFieldStyles.inputWrapper}>
        {renderField()}
        {hasErrors && (
          <div className={formFieldStyles.errorIcon.container}>
            <AlertCircle
              className={formFieldStyles.errorIcon.icon}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {hasErrors && (
        <div className={formFieldStyles.errorMessages.container} role="alert">
          {errors.map((error, index) => (
            <div key={index} className={formFieldStyles.errorMessages.message}>
              <AlertCircle
                className={formFieldStyles.errorMessages.icon}
                aria-hidden="true"
              />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormField;
