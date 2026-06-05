import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalCustomers: number;
  totalRevenue: number;
}

export function CustomerSummary({
  totalCustomers,
  totalRevenue,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "24px",
      }}
    >
      <Card>
        <Title3>Total Customers</Title3>
        <Text>{totalCustomers}</Text>
      </Card>

      <Card>
        <Title3>Total Revenue</Title3>
        <Text>
          ${totalRevenue.toLocaleString()}
        </Text>
      </Card>
    </div>
  );
}