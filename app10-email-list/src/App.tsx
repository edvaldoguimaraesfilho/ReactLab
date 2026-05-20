import {
  Button,
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  Mail24Regular,
  Send24Regular,
  Archive24Regular,
} from "@fluentui/react-icons";

import { EmailList } from "./components/EmailList";

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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Title1>Corporate Inbox</Title1>

        <Text>
          A static Outlook-inspired email list built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <Card
          style={{
            marginTop: "32px",
            padding: "20px",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Button appearance="primary" icon={<Mail24Regular />}>
            Inbox
          </Button>

          <Button icon={<Send24Regular />}>Sent</Button>

          <Button icon={<Archive24Regular />}>Archive</Button>
        </Card>

        <EmailList />
      </section>
    </main>
  );
}

export default App;