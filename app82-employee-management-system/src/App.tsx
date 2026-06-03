import { useMemo, useState } from "react";

import { Card, Text, Title1 } from "@fluentui/react-components";

import { DashboardSummary } from "./components/DashboardSummary";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeGrid } from "./components/EmployeeGrid";
import { EmployeeSearch } from "./components/EmployeeSearch";

import { initialEmployees } from "./data/employees";
import type { Employee } from "./models/Employee";

import "./styles/app.css";

const emptyEmployee: Employee = {
  id: 0,
  name: "",
  email: "",
  department: "",
  position: "",
  status: "Active",
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const [searchText, setSearchText] = useState("");

  const [currentEmployee, setCurrentEmployee] =
    useState<Employee>(emptyEmployee);

  const [editingEmployeeId, setEditingEmployeeId] =
    useState<number | null>(null);

  const isEditing = editingEmployeeId !== null;

  const filteredEmployees = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    if (!search) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.position.toLowerCase().includes(search)
      );
    });
  }, [employees, searchText]);

  function resetForm() {
    setCurrentEmployee(emptyEmployee);
    setEditingEmployeeId(null);
  }

  function validateEmployee(employee: Employee) {
    return (
      employee.name.trim() !== "" &&
      employee.email.trim() !== "" &&
      employee.department.trim() !== "" &&
      employee.position.trim() !== ""
    );
  }

  function handleSubmit() {
    if (!validateEmployee(currentEmployee)) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing && editingEmployeeId !== null) {
      const updatedEmployee: Employee = {
        ...currentEmployee,
        id: editingEmployeeId,
        name: currentEmployee.name.trim(),
        email: currentEmployee.email.trim(),
        department: currentEmployee.department.trim(),
        position: currentEmployee.position.trim(),
      };

      setEmployees(
        employees.map((employee) =>
          employee.id === editingEmployeeId ? updatedEmployee : employee
        )
      );

      resetForm();
      return;
    }

    const newEmployee: Employee = {
      ...currentEmployee,
      id: Date.now(),
      name: currentEmployee.name.trim(),
      email: currentEmployee.email.trim(),
      department: currentEmployee.department.trim(),
      position: currentEmployee.position.trim(),
    };

    setEmployees([...employees, newEmployee]);
    resetForm();
  }

  function handleEdit(employee: Employee) {
    setCurrentEmployee(employee);
    setEditingEmployeeId(employee.id);
  }

  function handleDelete(employeeId: number) {
    setEmployees(employees.filter((employee) => employee.id !== employeeId));

    if (editingEmployeeId === employeeId) {
      resetForm();
    }
  }

  return (
    <main className="app-shell">
      <section className="app-container">
        <header className="app-header">
          <Title1>Employee Management System</Title1>

          <Text>
            Enterprise React CRUD application with Fluent UI, TypeScript,
            DataGrid, controlled forms, search, and derived dashboard metrics.
          </Text>
        </header>

        <DashboardSummary employees={employees} />

        <div className="layout-grid">
          <EmployeeForm
            employee={currentEmployee}
            isEditing={isEditing}
            onEmployeeChange={setCurrentEmployee}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />

          <Card className="grid-card">
            <EmployeeSearch
              searchText={searchText}
              onSearchChange={setSearchText}
            />

            <EmployeeGrid
              employees={filteredEmployees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Card>
        </div>
      </section>
    </main>
  );
}

export default App;