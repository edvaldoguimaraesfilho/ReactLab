import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialTodos } from "./data/initialTodos";

import type { TodoItem } from "./models/TodoItem";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] =
    useState<TodoItem[]>(initialTodos);

  function handleAddTodo(title: string) {
    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
  }

  function handleToggleTodo(id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleDeleteTodo(id: number) {
    const filteredTodos =
      todos.filter((todo) =>
        todo.id !== id
      );

    setTodos(filteredTodos);
  }

  const completedTasks =
    todos.filter((todo) =>
      todo.completed
    ).length;

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Complete ToDo List
        </Title1>

        <Text>
          Interactive React ToDo application
          with Fluent UI.
        </Text>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Text>
            Total Tasks: {todos.length}
          </Text>

          <br />

          <Text>
            Completed Tasks:
            {" "}
            {completedTasks}
          </Text>
        </div>

        <TodoForm
          onAddTodo={handleAddTodo}
        />

        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </section>
    </main>
  );
}

export default App;