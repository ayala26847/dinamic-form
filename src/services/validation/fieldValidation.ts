import { FieldRules } from "../../types/form/form.types";

/**
 * Validates a field value against its rules
 * @param value - The field value to validate
 * @param rules - The validation rules for the field
 * @returns Array of error messages (empty if valid)
 */
export const validateField = (value: string | number, rules: FieldRules): string[] => {
  const errors: string[] = [];
  const stringValue = String(value).trim();

  // Required validation
  if (rules.required?.value && !stringValue) {
    errors.push(rules.required.error_message);
    return errors; // If required and empty, no need to check other rules
  }

  // Skip other validations if field is empty and not required
  if (!stringValue && !rules.required?.value) {
    return errors;
  }

  // Min length/value validation
  if (rules.min && rules.min.value !== null) {
    const minValue = rules.min.value;
    if (typeof value === 'number' && value < minValue) {
      errors.push(rules.min.error_message.replace('{{value}}', minValue.toString()));
    } else if (typeof value === 'string' && stringValue.length < minValue) {
      errors.push(rules.min.error_message.replace('{{value}}', minValue.toString()));
    }
  }

  // Max length/value validation
  if (rules.max && rules.max.value !== null) {
    const maxValue = rules.max.value;
    if (typeof value === 'number' && value > maxValue) {
      errors.push(rules.max.error_message.replace('{{value}}', maxValue.toString()));
    } else if (typeof value === 'string' && stringValue.length > maxValue) {
      errors.push(rules.max.error_message.replace('{{value}}', maxValue.toString()));
    }
  }

  // Regex validation
  if (rules.regex && rules.regex.value && stringValue) {
    const regex = new RegExp(rules.regex.value);
    if (!regex.test(stringValue)) {
      errors.push(rules.regex.error_message);
    }
  }

  return errors;
};

/**
 * Validates multiple fields at once
 * @param formData - The form data to validate
 * @param fieldsRules - Object mapping field labels to their rules
 * @returns Object mapping field labels to their error arrays
 */
export const validateMultipleFields = (
  formData: Record<string, string | number>,
  fieldsRules: Record<string, FieldRules>
): Record<string, string[]> => {
  const errors: Record<string, string[]> = {};
  
  Object.keys(fieldsRules).forEach(fieldLabel => {
    const value = formData[fieldLabel] || '';
    const rules = fieldsRules[fieldLabel];
    const fieldErrors = validateField(value, rules);
    
    if (fieldErrors.length > 0) {
      errors[fieldLabel] = fieldErrors;
    }
  });
  
  return errors;
};