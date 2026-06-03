import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Delete24Regular,
  CheckmarkCircle24Regular,
  Clock24Regular,
} from "@fluentui/react-icons";

import { useTasks } from "../context/TaskContext";
import type { TaskItem, TaskStatus } from "../models/TaskItem";

interface TaskCardProps {
  task: TaskItem;
}

function getNextStatus(status: TaskStatus): TaskStatus {
  if (status === "Not Started") {
    return "In Progress";
  }

  if (status === "In Progress") {
    return "Completed";
  }

  return "Not Started";
}

export function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useTasks();

  function handleChangeStatus() {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        id: task.id,
        status: getNextStatus(task.status),
      },
    });
  }

  function handleDelete() {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        id: task.id,
      },
    });
  }

  return (
    <Card className="taskCard">
      <CardHeader
        image={
          task.status === "Completed" ? (
            <CheckmarkCircle24Regular />
          ) : (
            <Clock24Regular />
          )
        }
        header={<Title3>{task.title}</Title3>}
        description={<Text>{task.owner} · {task.department}</Text>}
      />

      <Text>{task.description}</Text>

      <div className="taskMeta">
        <Badge appearance="filled">{task.status}</Badge>
        <Badge appearance="outline">{task.priority}</Badge>
      </div>

      <div className="taskActions">
        <Button appearance="secondary" onClick={handleChangeStatus}>
          Change Status
        </Button>

        <Button
          appearance="outline"
          icon={<Delete24Regular />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}