import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { CRMHeader } from "./components/CRMHeader";
import { CustomerGrid } from "./components/CustomerGrid";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "48px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <CRMHeader />

          <CustomerGrid />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;