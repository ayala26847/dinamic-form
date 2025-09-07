import axios from "axios";

export async function fetchSchema() {
  const response = await axios.get(
    "https://private-705dcb-formgenerator1.apiary-mock.com/form_fields"
  );

  // אם השרת מחזיר טקסט JSON בתוך response.data (string)
  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;

  return data;
}

// import axios from "axios";
// import { Schema } from "../../types/form/form.types";
// export async function fetchSchema(): Promise<Schema> {
//   const response = await axios.get(
//     "https://private-705dcb-formgenerator1.apiary-mock.com/form_fields"
//   );
//   return response.data;
// }