// import { FieldRules } from "../types/form/form.types";

// export const validateField = (value: string | number, rules: FieldRules): string[] => {
//     const errors: string[] = [];
//     const stringValue = String(value).trim();
  
//     // Required validation
//     if (rules.required?.value && !stringValue) {
//       errors.push(rules.required.error_message);
//       return errors; // If required and empty, no need to check other rules
//     }
  
//     // Skip other validations if field is empty and not required
//     if (!stringValue && !rules.required?.value) {
//       return errors;
//     }
  
//     // Min length/value validation
//     if (rules.min && rules.min.value !== null) {
//       const minValue = rules.min.value;
//       if (typeof value === 'number' && value < minValue) {
//         errors.push(rules.min.error_message.replace('{{value}}', minValue.toString()));
//       } else if (typeof value === 'string' && stringValue.length < minValue) {
//         errors.push(rules.min.error_message.replace('{{value}}', minValue.toString()));
//       }
//     }
  
//     // Max length/value validation
//     if (rules.max && rules.max.value !== null) {
//       const maxValue = rules.max.value;
//       if (typeof value === 'number' && value > maxValue) {
//         errors.push(rules.max.error_message.replace('{{value}}', maxValue.toString()));
//       } else if (typeof value === 'string' && stringValue.length > maxValue) {
//         errors.push(rules.max.error_message.replace('{{value}}', maxValue.toString()));
//       }
//     }
  
//     // Regex validation
//     if (rules.regex && rules.regex.value && stringValue) {
//       const regex = new RegExp(rules.regex.value);
//       if (!regex.test(stringValue)) {
//         errors.push(rules.regex.error_message);
//       }
//     }
  
//     return errors;
//   };
//////////////////////////////
  import { useState, useCallback } from 'react';
import { validateField, validateMultipleFields } from '../services/validation/fieldValidation';
import { FieldErrors, FormData, FieldRules } from '../types/form/form.types';

interface UseFormValidationParams {
  initialData?: FormData;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

interface UseFormValidationReturn {
  formData: FormData;
  fieldErrors: FieldErrors;
  isFormValid: boolean;
  validateSingleField: (fieldLabel: string, value: string | number, rules: FieldRules) => void;
  setFieldValue: (fieldLabel: string, value: string | number, rules: FieldRules) => void;
  resetForm: (newData?: FormData) => void;
  getFieldError: (fieldLabel: string) => string[];
  validateAllFields: (fieldsRules: Record<string, FieldRules>) => boolean;
}

export const useFormValidation = ({
  initialData = {},
  validateOnChange = true,
  validateOnBlur = false
}: UseFormValidationParams = {}): UseFormValidationReturn => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Set field value and optionally validate
  const setFieldValue = useCallback((fieldLabel: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldLabel]: value
    }));
  }, []);

  // Validate a single field
  const validateSingleField = useCallback((fieldLabel: string, value: string | number, rules: FieldRules) => {
    const errors = validateField(value, rules);
    
    setFieldErrors((prev: any) => ({
      ...prev,
      [fieldLabel]: errors
    }));

    return errors.length === 0;
  }, []);

  // Handle field change with validation
  const handleFieldChange = useCallback((fieldLabel: string, value: string | number, rules: FieldRules) => {
    setFieldValue(fieldLabel, value);
    
    if (validateOnChange) {
      validateSingleField(fieldLabel, value, rules);
    }
  }, [setFieldValue, validateSingleField, validateOnChange]);

  // Get errors for a specific field
  const getFieldError = useCallback((fieldLabel: string): string[] => {
    return fieldErrors[fieldLabel] || [];
  }, [fieldErrors]);

  // Validate all fields at once
  const validateAllFields = useCallback((fieldsRules: Record<string, FieldRules>): boolean => {
    const errors = validateMultipleFields(formData, fieldsRules);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Check if form is currently valid
  const isFormValid = Object.keys(fieldErrors).every(key => 
    fieldErrors[key].length === 0
  ) && Object.keys(fieldErrors).length > 0;

  // Reset form to initial or new data
  const resetForm = useCallback((newData: FormData = initialData) => {
    setFormData(newData);
    setFieldErrors({});
  }, [initialData]);
// todo change any
  return {
    formData,
    fieldErrors,
    isFormValid,
    validateSingleField,
    setFieldValue: handleFieldChange as any,
    resetForm,
    getFieldError,
    validateAllFields
  };
};