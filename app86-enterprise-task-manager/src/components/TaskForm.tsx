import { useState } from "react";

import {
  Button,
  Card,
  Field,
  Input,
  Textarea,
  Title3,
} from "@fluentui/react-components";

import { Add24Regular } from "@fluentui/react-icons";

import { useTasks } from "../context/TaskContext";
import type { TaskItem } from "../models/TaskItem";

export function TaskForm() {
  const { dispatch } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [department, setDepartment] = useState("");

  const isValid =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    owner.trim().length > 0 &&
    department.trim().length > 0;

  function handleAddTask() {
    if (!isValid) {
      return;
    }

    const newTask: TaskItem = {
      id: Date.now(),
      title,
      description,
      owner,
      department,
      status: "Not Started",
      priority: "Medium",
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });

    setTitle("");
    setDescription("");
    setOwner("");
    setDepartment("");
  }

  return (
    <Card className="taskForm">
      <Title3>Create Enterprise Task</Title3>

      <Field label="Title">
        <Input
          value={title}
          onChange={(_, data) => setTitle(data.value)}
          placeholder="Enter task title"
        />
      </Field>

      <Field label="Description">
        <Textarea
          value={description}
          onChange={(_, data) => setDescription(data.value)}
          placeholder="Describe the task"
        />
      </Field>

      <Field label="Owner">
        <Input
          value={owner}
          onChange={(_, data) => setOwner(data.value)}
          placeholder="Task owner"
        />
      </Field>

      <Field label="Department">
        <Input
          value={department}
          onChange={(_, data) => setDepartment(data.value)}
          placeholder="Department"
        />
      </Field>

      <Button
        appearance="primary"
        icon={<Add24Regular />}
        disabled={!isValid}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </Card>
  );
}