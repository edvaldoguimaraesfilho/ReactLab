import { Text } from "@fluentui/react-components";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <Text>No enterprise tasks found.</Text>;
  }

  return (
    <div className="taskList">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}