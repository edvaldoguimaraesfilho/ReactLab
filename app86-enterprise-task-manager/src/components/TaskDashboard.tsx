import { Text, Title1 } from "@fluentui/react-components";

import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskSummary } from "./TaskSummary";

export function TaskDashboard() {
  return (
    <main className="appShell">
      <section className="pageHeader">
        <Title1>Enterprise Task Manager</Title1>

        <Text>
          A complete React task management application using reducer,
          context, TypeScript, and Fluent UI.
        </Text>
      </section>

      <TaskSummary />

      <section className="contentGrid">
        <TaskForm />
        <TaskList />
      </section>
    </main>
  );
}