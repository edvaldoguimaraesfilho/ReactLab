import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface KpiCardsProps {
  employees: number;
  products: number;
}

export function KpiCards({
  employees,
  products,
}: KpiCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "16px",
      }}
    >
      <Card>
        <Title3>Total Employees</Title3>
        <Text>{employees}</Text>
      </Card>

      <Card>
        <Title3>Total Products</Title3>
        <Text>{products}</Text>
      </Card>
    </div>
  );
}