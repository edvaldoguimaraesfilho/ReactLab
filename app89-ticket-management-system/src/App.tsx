import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { HomePage }
  from "./pages/HomePage";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: "32px",
        }}
      >
        <Title1>
          Ticket Management System
        </Title1>

        <HomePage />
      </main>
    </FluentProvider>
  );
}

export default App;