import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Clock24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { TaskItem } from "../models/TaskItem";

interface TaskCardProps {
  task: TaskItem;
}

function getStatusIcon(status: TaskItem["status"]) {
  if (status === "Completed") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "In Progress") {
    return <Clock24Regular />;
  }

  return <Warning24Regular />;
}

function getBadgeAppearance(status: TaskItem["status"]) {
  if (status === "Completed") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(task.status)}
        header={<Title3>{task.title}</Title3>}
        description={<Caption1>Owner: {task.owner}</Caption1>}
      />

      <Body1>{task.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          alignItems: "center",
        }}
      >
        <Badge appearance={getBadgeAppearance(task.status)}>
          {task.status}
        </Badge>

        <Text size={200}>Priority: {task.priority}</Text>
      </div>
    </Card>
  );
}