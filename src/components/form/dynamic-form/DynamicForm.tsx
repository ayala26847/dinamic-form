import React, { useEffect, useState } from "react";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { fetchSchema } from "../../../services/api/schemaService";
import { FieldRules, FormSection } from "../../../types/form/form.types";
import { ErrorMessage } from "../../common/ErrorMessage";
import FormField from "../form-field/FormField";
import { FormHeader } from "../FormHeader";
import { DynamicFormProps, DynamicFormState } from "./DynamicForm.type";
import { dynamicFormConsts } from "./dynamicFormConsts";
import { Loader } from "../../common/Loader";
import { SuccessModal } from "../success-modal";
import { dynamicFormStyles, getDynamicFormClasses } from "./DynamicForm.styles";

export const DynamicForm: React.FC<DynamicFormProps> = ({
  onSubmit,
  submitButtonText = dynamicFormConsts.SubmitButtonText,
  showProgressBar = false,
  enableAutoSave = false,
  className = "",
}) => {
  const [schema, setSchema] = useState<FormSection[] | null>(null);
  const [state, setState] = useState<DynamicFormState>({
    isLoading: true,
    error: null,
    showSuccessModal: false,
    isSubmitting: false,
  });
  const { formData, fieldErrors, setFieldValue, validateAllFields, resetForm } =
    useFormValidation({ validateOnChange: true });

  useEffect(() => {
    const loadSchema = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const data = await fetchSchema();
        setSchema(data);
        setState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load form schema'
        }));
      }
    };
    loadSchema();
  }, []);



  // Build field rules object for validation
  const getFieldsRules = (): Record<string, FieldRules> => {
    const rules: Record<string, FieldRules> = {};
    if (schema) {
      schema.forEach((section: FormSection) => {
        section.fields.forEach((field) => {
          rules[field.label] = field.rules;
        });
      });
    }
    return rules;
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    if (!schema) return false;
    
    const fieldsRules = getFieldsRules();
    let hasErrors = false;
    let hasEmptyRequired = false;

    Object.keys(fieldsRules).forEach((fieldLabel) => {
      const fieldValue = formData[fieldLabel];
      const errors = fieldErrors[fieldLabel] || [];
      const rules = fieldsRules[fieldLabel];

      if (errors.length > 0) {
        hasErrors = true;
      }

      if (rules.required?.value && !String(fieldValue).trim()) {
        hasEmptyRequired = true;
      }
    });

    return !hasErrors && !hasEmptyRequired;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const fieldsRules = getFieldsRules();
    const isValid = validateAllFields(fieldsRules);

    if (!isValid) {
      return;
    }

    try {
      setState((prev: DynamicFormState) => ({ ...prev, isSubmitting: true }));

      if (onSubmit) {
        await onSubmit(formData as any);
      }

      setState((prev: DynamicFormState) => ({
        ...prev,
        showSuccessModal: true,
        isSubmitting: false,
      }));
    } catch (error) {
      setState((prev: DynamicFormState) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to submit form",
        isSubmitting: false,
      }));
    }
  };

  // Handle field change
  const handleFieldChange = (
    fieldLabel: string,
    value: string | number,
    rules: FieldRules
  ) => {
    // setFieldValue(fieldLabel, value);
    setFieldValue(fieldLabel, value, rules);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setState((prev: DynamicFormState) => ({ ...prev, showSuccessModal: false }));
  };

  // Calculate progress percentage
  const getProgressPercentage = (): number => {
    if (!schema) return 0;
    
    // Get all field labels from schema
    const allFieldLabels: string[] = [];
    schema.forEach((section: FormSection) => {
      section.fields.forEach((field) => {
        allFieldLabels.push(field.label);
      });
    });

    if (allFieldLabels.length === 0) return 0;

    // Count filled fields (non-empty values)
    const filledFieldsCount = allFieldLabels.filter((fieldLabel) => {
      const value = formData[fieldLabel];
      return value !== undefined && value !== null && String(value).trim() !== '';
    }).length;

    return Math.round((filledFieldsCount / allFieldLabels.length) * 100);
  };

  // Show loading state
  if (state.isLoading) {
    return <Loader message="Loading form..." />
   
  }

  // Show error state
  if (state.error) {
    return (
      <ErrorMessage
        message={state.error}
        title="Error Loading Form"
        variant="fullPage"
        showRetryButton={true}
        className={className}
      />
    );
  }

  // Show form when schema is loaded
  if (!schema) {
    return null;
  }

  return (
    <div className={getDynamicFormClasses.container(className)}>
      <div className={dynamicFormStyles.wrapper}>
        {/* Header */}
        <FormHeader
          title="Dynamic Form"
          subtitle="Please fill out all required fields"
          showProgressBar={showProgressBar}
          progressPercentage={getProgressPercentage()}
        />

        {/* Form */}
        <div className={dynamicFormStyles.formCard}>
          <div className={dynamicFormStyles.formContent}>
            {schema.map((section: FormSection, sectionIndex: number) => (
              <div key={sectionIndex} className={dynamicFormStyles.section.container}>
                <h2 className={dynamicFormStyles.section.title}>
                  {section.title}
                </h2>

                <div className={dynamicFormStyles.section.fieldsGrid}>
                  {section.fields.map((field, fieldIndex) => (
                    <FormField
                      key={fieldIndex}
                      field={field}
                      value={formData[field.label] || ""}
                      errors={fieldErrors[field.label] || []}
                      onChange={(value: string | number) =>
                        handleFieldChange(field.label, value, field.rules)
                      }
                      testId={`field-${field.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className={dynamicFormStyles.submitButton.container}>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid() || state.isSubmitting}
                className={getDynamicFormClasses.submitButton(isFormValid(), state.isSubmitting)}
              >
                {state.isSubmitting ? (
                  <div className={dynamicFormStyles.loading.container}>
                    <div className={dynamicFormStyles.loading.spinner} />
                    Submitting...
                  </div>
                ) : (
                  submitButtonText
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={state.showSuccessModal}
        formData={formData as any}
        onClose={handleCloseModal}
        allowDataExport={true}
      />
    </div>
  );
};