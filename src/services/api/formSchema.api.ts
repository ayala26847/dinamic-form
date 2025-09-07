
import { ApiResponse, FormSection } from "../../types/form/form.types";

// Mock data - replace with actual API endpoint
const MOCK_API_DATA: FormSection[] = [
  {
    "title": "Personal Info",
    "fields": [
      {
        "type": "input",
        "label": "First Name",
        "rules": {
          "required": {
            "value": true,
            "error_message": "This field is required"
          },
          "min": {
            "value": 3,
            "error_message": "Please enter a name of at least {{value}} letters"
          },
          "max": {
            "value": 15,
            "error_message": "Please enter a name of at most {{value}} letters"
          },
          "regex": {
            "value": "^[A-Za-z]+$",
            "error_message": "This field should only contain letters"
          }
        }
      },
      {
        "type": "input",
        "label": "Last Name",
        "rules": {
          "required": {
            "value": true,
            "error_message": "This field is required"
          },
          "min": {
            "value": 3,
            "error_message": "Please enter a name of at least {{value}} letters"
          },
          "max": {
            "value": 15,
            "error_message": "Please enter a name of at most {{value}} letters"
          },
          "regex": {
            "value": "^[A-Za-z]+$",
            "error_message": "This field should only contain letters"
          }
        }
      },
      {
        "type": "input",
        "label": "Email",
        "rules": {
          "required": {
            "value": true,
            "error_message": "This field is required"
          },
          "min": {
            "value": 0,
            "error_message": "Please enter an email of at least {{value}} letters"
          },
          "max": {
            "value": 100,
            "error_message": "Please enter an email of at most {{value}} letters"
          },
          "regex": {
            "value": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            "error_message": "This field should contain a valid email format"
          }
        }
      },
      {
        "type": "select",
        "label": "Gender",
        "options": [
          {
            "key": "Male",
            "value": "M"
          },
          {
            "key": "Female",
            "value": "F"
          }
        ],
        "rules": {
          "required": {
            "value": true,
            "error_message": "This field is required"
          }
        }
      },
      {
        "type": "input_number",
        "label": "Age",
        "rules": {
          "required": {
            "value": true,
            "error_message": "This field is required"
          },
          "min": {
            "value": 10,
            "error_message": "Please enter a value of at least {{value}}"
          },
          "max": {
            "value": 90,
            "error_message": "Please enter a value of at most {{value}}"
          },
          "regex": {
            "value": "^[0-9]+$",
            "error_message": "This field should only contain numbers"
          }
        }
      },
      {
        "type": "textarea",
        "label": "Your Request",
        "rules": {
          "required": {
            "value": true,
            "error_message": "This field is required"
          },
          "min": {
            "value": 5,
            "error_message": "Please enter at least {{value}} characters"
          },
          "max": {
            "value": 2000,
            "error_message": "Please enter at most {{value}} characters"
          }
        }
      }
    ]
  }
];

/**
 * Fetches form schema from API
 * Replace this with actual API call
 */
export const fetchFormSchema = async (): Promise<FormSection[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Replace with actual API call:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/form-schema`);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // return await response.json();
    
    return MOCK_API_DATA;
  } catch (error) {
    console.error('Failed to fetch form schema:', error);
    throw new Error('Failed to load form configuration');
  }
};

/**
 * Submit form data to API
 */
export const submitFormData = async (formData: Record<string, string | number>): Promise<ApiResponse<any>> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Replace with actual API call:
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/submit-form`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });
    
    // Mock successful response
    return {
      data: formData,
      status: 'success',
      message: 'Form submitted successfully'
    };
  } catch (error) {
    console.error('Failed to submit form:', error);
    throw new Error('Failed to submit form data');
  }
};