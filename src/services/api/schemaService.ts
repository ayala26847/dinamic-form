import axios from "axios";

export async function fetchSchema() {
  const response = await axios.get(
    "https://private-705dcb-formgenerator1.apiary-mock.com/form_fields"
  );
// Handle case where response data is a string
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;

  return data;
}
