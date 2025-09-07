import { appConsts } from "./appConsts";
import { DynamicForm } from "./components/form/dynamic-form/DynamicForm";
import { appStyles } from "./App.styles";
import "./index.css";

function App() {
  return (
    <div className={appStyles.container}>
      <DynamicForm
        submitButtonText={appConsts.SubmitButtonText}
        showProgressBar={true}
        enableAutoSave={false}
      />
    </div>
  );
}

export default App;
