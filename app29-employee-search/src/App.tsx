import { useState } from "react";
import { Card, Text, Title1 } from "@fluentui/react-components";

import { employees } from "./data/employees";
import { EmployeeSearchBox } from "./components/EmployeeSearchBox";
import { EmployeeList } from "./components/EmployeeList";

function App() {
  const [searchText, setSearchText] = useState("");

  const normalizedSearchText = searchText.toLowerCase().trim();

  const filteredEmployees = employees.filter((employee) => {
    const searchableText = `
      ${employee.name}
      ${employee.role}
      ${employee.department}
      ${employee.location}
      ${employee.status}
    `.toLowerCase();

    return searchableText.includes(normalizedSearchText);
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Title1>Employee Search</Title1>

        <Text>
          A React employee search interface using controlled input, derived
          filtering, TypeScript models, and Fluent UI components.
        </Text>

        <Card style={{ padding: "24px", marginTop: "32px" }}>
          <EmployeeSearchBox
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />

          <Text size={200}>
            Showing {filteredEmployees.length} of {employees.length} employees.
          </Text>
        </Card>

        <EmployeeList employees={filteredEmployees} />
      </section>
    </main>
  );
}

export default App;