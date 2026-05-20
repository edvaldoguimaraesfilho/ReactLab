import type { TodoItem } from "../models/TodoItem";

export const initialTodos: TodoItem[] = [
  {
    id: 1,
    title: "Study React state management",
    completed: true,
  },
  {
    id: 2,
    title: "Build Fluent UI components",
    completed: false,
  },
  {
    id: 3,
    title: "Understand immutable updates",
    completed: false,
  },
];