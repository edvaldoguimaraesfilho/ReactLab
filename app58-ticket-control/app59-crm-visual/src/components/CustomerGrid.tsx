import { customers } from "../data/customers";
import { CustomerCard } from "./CustomerCard";

export function CustomerGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
      }}
    >
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
        />
      ))}
    </div>
  );
}