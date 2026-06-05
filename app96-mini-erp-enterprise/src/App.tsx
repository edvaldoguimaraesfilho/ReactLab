import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { employees } from "./data/employees";
import { products } from "./data/products";

import { KpiCards } from "./components/KpiCards";
import { EmployeeGrid } from "./components/EmployeeGrid";
import { ProductGrid } from "./components/ProductGrid";

function App() {
  return (
    <main
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Title1>Mini ERP Enterprise</Title1>

      <Text>
        Enterprise Resource Planning Dashboard
      </Text>

      <KpiCards
        employees={employees.length}
        products={products.length}
      />

      <EmployeeGrid employees={employees} />

      <ProductGrid products={products} />
    </main>
  );
}

export default App;