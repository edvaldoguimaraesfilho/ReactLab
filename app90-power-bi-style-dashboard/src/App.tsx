import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { DashboardSummary } from "./components/DashboardSummary";
import { RegionPanel } from "./components/RegionPanel";
import { SalesTable } from "./components/SalesTable";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f2f1",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Card style={{ padding: "28px" }}>
          <Title1>Power BI Style Dashboard</Title1>
          <Text>
            Enterprise analytics dashboard built with React, TypeScript,
            Vite, and Fluent UI.
          </Text>
        </Card>

        <DashboardSummary />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 420px) 1fr",
            gap: "24px",
          }}
        >
          <RegionPanel />
          <SalesTable />
        </div>
      </section>
    </main>
  );
}

export default App;