import {
  Badge,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import { alerts } from "../data/alerts";

export function AlertsPanel() {
  return (
    <Card>
      <Title3>Governance Alerts</Title3>

      {alerts.map((alert) => (
        <div key={alert.id}>
          <Badge>{alert.severity}</Badge>

          <Text>
            {alert.title}
          </Text>
        </div>
      ))}
    </Card>
  );
}