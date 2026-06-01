import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { NotificationList } from "./components/NotificationList";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Card
          style={{
            padding: "32px",
          }}
        >
          <Title1>
            Enterprise Notification Center
          </Title1>

          <Text>
            Centralized Microsoft-style notification
            management built with React, TypeScript,
            and Fluent UI.
          </Text>

          <NotificationList />
        </Card>
      </section>
    </main>
  );
}

export default App;