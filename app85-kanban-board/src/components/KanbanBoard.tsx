import { tasks } from "../data/tasks";

import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto",
      }}
    >
      <KanbanColumn
        title="Backlog"
        tasks={tasks.filter(
          x => x.status === "Backlog"
        )}
      />

      <KanbanColumn
        title="To Do"
        tasks={tasks.filter(
          x => x.status === "To Do"
        )}
      />

      <KanbanColumn
        title="In Progress"
        tasks={tasks.filter(
          x => x.status === "In Progress"
        )}
      />

      <KanbanColumn
        title="Review"
        tasks={tasks.filter(
          x => x.status === "Review"
        )}
      />

      <KanbanColumn
        title="Done"
        tasks={tasks.filter(
          x => x.status === "Done"
        )}
      />
    </div>
  );
}