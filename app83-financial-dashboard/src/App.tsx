import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { FinancialSummary } from "./components/FinancialSummary";
import { FinancialGrid } from "./components/FinancialGrid";

import { financialData } from "./services/financialService";

function App() {

  const totalRevenue =
    financialData.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

  const totalExpenses =
    financialData.reduce(
      (sum, item) => sum + item.expenses,
      0
    );

  return (
    <main
      style={{
        padding: "32px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Financial Dashboard
      </Title1>

      <Text>
        Enterprise Financial Overview
      </Text>

      <div style={{ marginTop: "24px" }}>
        <FinancialSummary
          revenue={totalRevenue}
          expenses={totalExpenses}
        />
      </div>

      <Card
        style={{
          marginTop: "30px",
          padding: "20px",
        }}
      >
        <FinancialGrid
          records={financialData}
        />
      </Card>
    </main>
  );
}

export default App;