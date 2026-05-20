import { useState } from "react";

import {
  Button,
  Input,
} from "@fluentui/react-components";

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

export function TodoForm({
  onAddTodo,
}: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    if (title.trim() === "") {
      return;
    }

    onAddTodo(title);

    setTitle("");
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginTop: "24px",
      }}
    >
      <Input
        placeholder="Enter a new task"
        value={title}
        onChange={(event, data) =>
          setTitle(data.value)
        }
      />

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Task
      </Button>
    </div>
  );
}