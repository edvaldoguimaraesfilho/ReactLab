import { KpiCard } from "./KpiCard";

interface Props {
  revenue: number;
  expenses: number;
}

export function FinancialSummary({
  revenue,
  expenses,
}: Props) {

  const profit = revenue - expenses;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      <KpiCard
        title="Revenue"
        value={`$${revenue.toLocaleString()}`}
      />

      <KpiCard
        title="Expenses"
        value={`$${expenses.toLocaleString()}`}
      />

      <KpiCard
        title="Profit"
        value={`$${profit.toLocaleString()}`}
      />
    </div>
  );
}