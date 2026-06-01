import {
  Avatar,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import { activities } from "../data/dashboardData";

export function ActivityPanel() {
  return (
    <section>
      <Title2>Recent Activity</Title2>

      <Card
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              borderBottom: "1px solid #eeeeee",
              paddingBottom: "12px",
            }}
          >
            <Avatar name={activity.user} />

            <div>
              <Text weight="semibold">{activity.user}</Text>

              <br />

              <Text>
                {activity.action} {activity.target}
              </Text>

              <br />

              <Text size={200}>{activity.time}</Text>
            </div>
          </div>
        ))}
      </Card>
    </section>
  );
}