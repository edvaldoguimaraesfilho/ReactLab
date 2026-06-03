import {
  Card,
  Title2,
} from "@fluentui/react-components";

import type { KanbanTask } from "../models/KanbanTask";

import { TaskCard } from "./TaskCard";

interface Props {
  title: string;
  tasks: KanbanTask[];
}

export function KanbanColumn({
  title,
  tasks,
}: Props) {
  return (
    <Card
      style={{
        width: "280px",
        minHeight: "600px",
        padding: "16px",
      }}
    >
      <Title2>{title}</Title2>

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </Card>
  );
}