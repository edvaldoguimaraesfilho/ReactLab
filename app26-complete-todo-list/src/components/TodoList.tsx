import { Text } from "@fluentui/react-components";

import type { TodoItem } from "../models/TodoItem";

import { TodoCard } from "./TodoCard";

interface TodoListProps {
  todos: TodoItem[];

  onToggleTodo: (id: number) => void;

  onDeleteTodo: (id: number) => void;
}

export function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Text
        style={{
          marginTop: "32px",
          display: "block",
        }}
      >
        No tasks available.
      </Text>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}