import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { AnalyticsDashboard }
  from "./components/AnalyticsDashboard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <Title1>
        Analytics System
      </Title1>

      <Text>
        Enterprise KPI and Metrics Dashboard
      </Text>

      <div style={{ marginTop: "24px" }}>
        <AnalyticsDashboard />
      </div>
    </main>
  );
}

export default App;