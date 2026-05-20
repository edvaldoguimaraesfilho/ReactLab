import { Text, Title1 } from "@fluentui/react-components";

import { CounterWithStep } from "./components/CounterWithStep";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section style={{ textAlign: "center" }}>
        <Title1>
          App 21c — Counter With Step
        </Title1>

        <Text>
          Exploring multiple React states and controlled inputs.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterWithStep />
        </div>
      </section>
    </main>
  );
}

export default App;