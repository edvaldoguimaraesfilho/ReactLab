import { useMemo, useState } from "react";

import {
  Input,
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeList } from "./components/EmployeeList";

import { initialEmployees } from "./data/initialEmployees";

import type { Employee } from "./models/Employee";

function App() {
  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const [search, setSearch] = useState("");

  function addEmployee(employee: Employee) {
    setEmployees((previous) => [
      ...previous,
      employee,
    ]);
  }

  function deleteEmployee(id: number) {
    setEmployees((previous) =>
      previous.filter((x) => x.id !== id)
    );
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [employees, search]);

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "32px",
        }}
      >
        <Title1>
          Employee CRUD System
        </Title1>

        <EmployeeForm onSave={addEmployee} />

        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(_, data) =>
            setSearch(data.value)
          }
        />

        <br />
        <br />

        <EmployeeList
          employees={filteredEmployees}
          onDelete={deleteEmployee}
        />
      </main>
    </FluentProvider>
  );
}

export default App;