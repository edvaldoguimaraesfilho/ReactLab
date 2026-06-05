import {
  Card,
  ProgressBar,
  Text,
  Title3,
} from "@fluentui/react-components";

import { salesRecords } from "../data/dashboardData";

export function RegionPanel() {
  return (
    <Card style={{ padding: "24px" }}>
      <Title3>Regional Target Performance</Title3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "20px",
        }}
      >
        {salesRecords.map((record) => {
          const progress = record.revenue / record.target;

          return (
            <div key={record.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <Text weight="semibold">{record.region}</Text>
                <Text>{Math.round(progress * 100)}%</Text>
              </div>

              <ProgressBar value={Math.min(progress, 1)} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}