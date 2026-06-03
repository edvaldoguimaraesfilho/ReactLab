import {
  Badge,
  Body1,
  Card,
  Caption1,
  Title3,
} from "@fluentui/react-components";

import type { KanbanTask } from "../models/KanbanTask";

interface Props {
  task: KanbanTask;
}

export function TaskCard({ task }: Props) {
  return (
    <Card
      style={{
        marginBottom: "12px",
        padding: "16px",
      }}
    >
      <Title3>{task.title}</Title3>

      <Body1>{task.description}</Body1>

      <Caption1>
        Owner: {task.owner}
      </Caption1>

      <div
        style={{
          marginTop: "12px",
        }}
      >
        <Badge appearance="filled">
          {task.priority}
        </Badge>
      </div>
    </Card>
  );
}