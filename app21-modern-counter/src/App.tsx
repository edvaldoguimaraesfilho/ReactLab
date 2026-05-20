import { Text, Title1 } from "@fluentui/react-components";
import { CounterPanel } from "./components/CounterPanel";

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
        <Title1>App 21 — Modern Counter</Title1>

        <Text>
          This app introduces React state, event handlers, and derived UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterPanel />
        </div>
      </section>
    </main>
  );
}

export default App;