import { Text, Title1 } from "@fluentui/react-components";
import { FinancialDashboard } from "./components/FinancialDashboard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>Static Financial Dashboard</Title1>

        <Text>
          A corporate financial overview built with React, TypeScript, Vite,
          and Fluent UI.
        </Text>

        <FinancialDashboard />
      </section>
    </main>
  );
}

export default App;