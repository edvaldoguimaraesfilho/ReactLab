import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import {
  EmployeeDirectoryPage,
} from "./pages/EmployeeDirectoryPage";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: "40px",
        }}
      >
        <EmployeeDirectoryPage />
      </main>
    </FluentProvider>
  );
}

export default App;