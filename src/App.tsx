import { appConsts } from "./appConsts";
import { DynamicForm } from "./components/form/dynamic-form/DynamicForm";
import SchemaForm from "./components/form/schema-form/SchemaForm";
import "./index.css";

function App() {
  return (
    <div className="App">
      <DynamicForm
        submitButtonText={appConsts.SubmitButtonText}
        showProgressBar={true}
        enableAutoSave={false}
      />
    </div>
  );
}

export default App;
