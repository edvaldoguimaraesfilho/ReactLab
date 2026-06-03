import { Card, Text, Title3 } from "@fluentui/react-components";
import { useTasks } from "../context/TaskContext";

export function TaskSummary() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const notStarted = tasks.filter((task) => task.status === "Not Started").length;

  return (
    <div className="summaryGrid">
      <Card>
        <Title3>Total</Title3>
        <Text size={600}>{total}</Text>
      </Card>

      <Card>
        <Title3>Completed</Title3>
        <Text size={600}>{completed}</Text>
      </Card>

      <Card>
        <Title3>In Progress</Title3>
        <Text size={600}>{inProgress}</Text>
      </Card>

      <Card>
        <Title3>Not Started</Title3>
        <Text size={600}>{notStarted}</Text>
      </Card>
    </div>
  );
}