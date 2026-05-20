import { Text, Title1 } from "@fluentui/react-components";
import { CounterWithHistory } from "./components/CounterWithHistory";

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
        <Title1>App 21d — Counter With History</Title1>

        <Text>
          Exploring array state, immutable updates, and user action history.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterWithHistory />
        </div>
      </section>
    </main>
  );
}

export default App;