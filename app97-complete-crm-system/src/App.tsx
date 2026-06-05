import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { customers } from "./services/customerService";

import { CustomerGrid } from "./components/CustomerGrid";
import { CustomerForm } from "./components/CustomerForm";
import { CustomerSummary } from "./components/CustomerSummary";

function App() {
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.annualRevenue,
    0
  );

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
        }}
      >
        <Title1>
          Enterprise CRM System
        </Title1>

        <CustomerSummary
          totalCustomers={customers.length}
          totalRevenue={totalRevenue}
        />

        <CustomerForm />

        <CustomerGrid customers={customers} />
      </main>
    </FluentProvider>
  );
}

export default App;