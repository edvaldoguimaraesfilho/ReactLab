import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Enterprise Kanban Board
      </Title1>

      <Text>
        Agile workflow management with React and Fluent UI.
      </Text>

      <div style={{ marginTop: "32px" }}>
        <KanbanBoard />
      </div>
    </main>
  );
}

export default App;