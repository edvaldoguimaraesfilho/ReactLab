import {
  Badge,
  Button,
  Card,
  Text,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";

import type { TodoItem } from "../models/TodoItem";

interface TodoCardProps {
  todo: TodoItem;

  onToggleTodo: (id: number) => void;

  onDeleteTodo: (id: number) => void;
}

export function TodoCard({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textDecoration: todo.completed
              ? "line-through"
              : "none",
          }}
        >
          {todo.title}
        </Text>

        <Badge
          appearance={
            todo.completed
              ? "filled"
              : "outline"
          }
        >
          {todo.completed
            ? "Completed"
            : "Pending"}
        </Badge>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Button
          icon={<CheckmarkCircle24Regular />}
          appearance="secondary"
          onClick={() =>
            onToggleTodo(todo.id)
          }
        >
          Toggle
        </Button>

        <Button
          icon={<Delete24Regular />}
          appearance="primary"
          onClick={() =>
            onDeleteTodo(todo.id)
          }
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}