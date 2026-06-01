import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { CalendarBoard }
from "./components/CalendarBoard";

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
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Corporate Calendar
        </Title1>

        <Text>
          Enterprise event management dashboard
          built with React and Fluent UI.
        </Text>

        <CalendarBoard />
      </section>
    </main>
  );
}

export default App;