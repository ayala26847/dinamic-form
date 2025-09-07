import axios from "axios";
import { FormSection } from "../../types/form/form.types";



const SCHEMA_URL = "https://private-705dcb-formgenerator1.apiary-mock.com/form_fields";

export async function fetchSchema(): Promise<FormSection[]> {
  try {
    const response = await axios.get(SCHEMA_URL, {
      headers: { Accept: "application/json" },
    });

    const rawData = response.data;

    const data: FormSection[] =
      typeof rawData === "string" ? JSON.parse(rawData) : rawData;

    return data;
  } catch (error) {
    console.error("Failed to fetch schema:", error);
    throw new Error("Unable to fetch form schema. Please try again later.");
  }
}

