import { Text, Title1 } from "@fluentui/react-components";
import { CounterStateLab } from "./components/CounterStateLab";

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
        <Title1>App 21b — Counter State Lab</Title1>

        <Text>
          A deeper experiment with state, derived values, and conditional UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterStateLab />
        </div>
      </section>
    </main>
  );
}

export default App;