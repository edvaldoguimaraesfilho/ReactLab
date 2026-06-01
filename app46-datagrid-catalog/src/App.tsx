import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { ProductDataGrid } from "./components/ProductDataGrid";

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
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "12px",
          }}
        >
          <ProductDataGrid />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;