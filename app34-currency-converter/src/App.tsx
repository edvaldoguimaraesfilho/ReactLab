import { Text, Title1 } from "@fluentui/react-components";

import { CurrencyConverterCard } from "./components/CurrencyConverterCard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f2f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Title1>Currency Converter</Title1>

        <Text>
          React + Fluent UI currency conversion interface.
        </Text>

        <CurrencyConverterCard />
      </section>
    </main>
  );
}

export default App;