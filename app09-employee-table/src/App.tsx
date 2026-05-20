import { Text, Title1 } from "@fluentui/react-components";
import { EmployeeTable } from "./components/EmployeeTable";

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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>Employee Table</Title1>

        <Text>
          A static Microsoft-style employee table built with React,
          TypeScript, Vite, and Fluent UI.
        </Text>

        <EmployeeTable />
      </section>
    </main>
  );
}

export default App;