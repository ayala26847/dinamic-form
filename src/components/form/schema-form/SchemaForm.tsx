import { useFetch } from "../../../hooks/useFetch";
import { fetchSchema } from "../../../services/api/schemaService";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import { Loader } from "../../common/Loader/Loader";
import { DynamicForm } from "../dynamic-form/DynamicForm";


export default function SchemaForm() {
  const { data: schema, loading, error } = useFetch(fetchSchema);

  const renderState = {
    loading: <Loader />,
    error: <ErrorMessage message={error || ""} />,
    success: schema && <DynamicForm  />,
  };

  if (loading) return renderState.loading;
  if (error) return renderState.error;
  return renderState.success || null;
}
