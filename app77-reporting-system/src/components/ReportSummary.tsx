import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalReports: number;
  totalViews: number;
}

export function ReportSummary({
  totalReports,
  totalViews,
}: Props) {
  return (
    <Card
      style={{
        padding: 20,
        marginBottom: 20,
      }}
    >
      <Title3>Reporting Overview</Title3>

      <Text block>
        Reports: {totalReports}
      </Text>

      <Text block>
        Total Views: {totalViews}
      </Text>
    </Card>
  );
}