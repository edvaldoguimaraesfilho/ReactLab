# App 82 — Employee Management System

App 82 is **Employee Management System**, from Block 5 — Complete Applications. It focuses on **Fluent UI DataGrid, forms, CRUD, search, derived state, and enterprise React architecture**. 

---

## 1. Create the project

```powershell
cd E:\EkisReactLab\React-Fluent-100Apps

npm create vite@latest app82-employee-management-system -- --template react-ts

cd app82-employee-management-system

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

## 2. Create folders and files

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\Employee.ts -ItemType File
New-Item src\data\employees.ts -ItemType File

New-Item src\components\DashboardSummary.tsx -ItemType File
New-Item src\components\EmployeeForm.tsx -ItemType File
New-Item src\components\EmployeeGrid.tsx -ItemType File
New-Item src\components\EmployeeSearch.tsx -ItemType File

New-Item src\styles\app.css -ItemType File
New-Item artigo.md -ItemType File
```

---

# Final structure

```txt
app82-employee-management-system/
  src/
    components/
      DashboardSummary.tsx
      EmployeeForm.tsx
      EmployeeGrid.tsx
      EmployeeSearch.tsx
    data/
      employees.ts
    models/
      Employee.ts
    styles/
      app.css
    App.tsx
    main.tsx
    index.css
```

---

# `src\models\Employee.ts`

```ts
export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: EmployeeStatus;
}
```

---

# `src\data\employees.ts`

```ts
import type { Employee } from "../models/Employee";

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "John Carter",
    email: "john.carter@contoso.com",
    department: "IT",
    position: "Frontend Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@contoso.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@contoso.com",
    department: "Human Resources",
    position: "HR Manager",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@contoso.com",
    department: "Operations",
    position: "Operations Lead",
    status: "Active",
  },
];
```

---

# `src\components\DashboardSummary.tsx`

```tsx
import { Card, Text, Title2 } from "@fluentui/react-components";
import type { Employee } from "../models/Employee";

interface DashboardSummaryProps {
  employees: Employee[];
}

export function DashboardSummary({ employees }: DashboardSummaryProps) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const totalDepartments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  return (
    <section className="summary-grid">
      <Card className="summary-card">
        <Text>Total Employees</Text>
        <Title2>{totalEmployees}</Title2>
      </Card>

      <Card className="summary-card">
        <Text>Active Employees</Text>
        <Title2>{activeEmployees}</Title2>
      </Card>

      <Card className="summary-card">
        <Text>Inactive Employees</Text>
        <Title2>{inactiveEmployees}</Title2>
      </Card>

      <Card className="summary-card">
        <Text>Departments</Text>
        <Title2>{totalDepartments}</Title2>
      </Card>
    </section>
  );
}
```

---

# `src\components\EmployeeSearch.tsx`

```tsx
import { Field, Input } from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";

interface EmployeeSearchProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

export function EmployeeSearch({
  searchText,
  onSearchChange,
}: EmployeeSearchProps) {
  return (
    <Field label="Search employees">
      <Input
        value={searchText}
        contentBefore={<Search24Regular />}
        placeholder="Search by name, email, department, or position"
        onChange={(_, data) => onSearchChange(data.value)}
      />
    </Field>
  );
}
```

---

# `src\components\EmployeeForm.tsx`

```tsx
import {
  Button,
  Card,
  Dropdown,
  Field,
  Input,
  Option,
  Title3,
} from "@fluentui/react-components";

import type { Employee, EmployeeStatus } from "../models/Employee";

interface EmployeeFormProps {
  employee: Employee;
  isEditing: boolean;
  onEmployeeChange: (employee: Employee) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function EmployeeForm({
  employee,
  isEditing,
  onEmployeeChange,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  function updateField(field: keyof Employee, value: string) {
    onEmployeeChange({
      ...employee,
      [field]: value,
    });
  }

  return (
    <Card className="form-card">
      <Title3>{isEditing ? "Edit Employee" : "Add Employee"}</Title3>

      <Field label="Name">
        <Input
          value={employee.name}
          placeholder="Employee name"
          onChange={(_, data) => updateField("name", data.value)}
        />
      </Field>

      <Field label="Email">
        <Input
          value={employee.email}
          placeholder="employee@contoso.com"
          onChange={(_, data) => updateField("email", data.value)}
        />
      </Field>

      <Field label="Department">
        <Input
          value={employee.department}
          placeholder="Department"
          onChange={(_, data) => updateField("department", data.value)}
        />
      </Field>

      <Field label="Position">
        <Input
          value={employee.position}
          placeholder="Position"
          onChange={(_, data) => updateField("position", data.value)}
        />
      </Field>

      <Field label="Status">
        <Dropdown
          value={employee.status}
          selectedOptions={[employee.status]}
          onOptionSelect={(_, data) =>
            updateField("status", data.optionValue as EmployeeStatus)
          }
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Dropdown>
      </Field>

      <div className="form-actions">
        <Button appearance="primary" onClick={onSubmit}>
          {isEditing ? "Update Employee" : "Add Employee"}
        </Button>

        {isEditing && (
          <Button appearance="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </Card>
  );
}
```

---

# `src\components\EmployeeGrid.tsx`

```tsx
import {
  Badge,
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  createTableColumn,
  type TableColumnDefinition,
} from "@fluentui/react-components";

import {
  Delete24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";

import type { Employee } from "../models/Employee";

interface EmployeeGridProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: number) => void;
}

export function EmployeeGrid({
  employees,
  onEdit,
  onDelete,
}: EmployeeGridProps) {
  const columns: TableColumnDefinition<Employee>[] = [
    createTableColumn<Employee>({
      columnId: "name",
      renderHeaderCell: () => "Name",
      renderCell: (employee) => employee.name,
    }),

    createTableColumn<Employee>({
      columnId: "email",
      renderHeaderCell: () => "Email",
      renderCell: (employee) => employee.email,
    }),

    createTableColumn<Employee>({
      columnId: "department",
      renderHeaderCell: () => "Department",
      renderCell: (employee) => employee.department,
    }),

    createTableColumn<Employee>({
      columnId: "position",
      renderHeaderCell: () => "Position",
      renderCell: (employee) => employee.position,
    }),

    createTableColumn<Employee>({
      columnId: "status",
      renderHeaderCell: () => "Status",
      renderCell: (employee) => (
        <Badge appearance={employee.status === "Active" ? "filled" : "outline"}>
          {employee.status}
        </Badge>
      ),
    }),

    createTableColumn<Employee>({
      columnId: "actions",
      renderHeaderCell: () => "Actions",
      renderCell: (employee) => (
        <div className="grid-actions">
          <Button
            appearance="subtle"
            icon={<Edit24Regular />}
            onClick={() => onEdit(employee)}
          >
            Edit
          </Button>

          <Button
            appearance="subtle"
            icon={<Delete24Regular />}
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  return (
    <DataGrid items={employees} columns={columns}>
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>

      <DataGridBody<Employee>>
        {({ item, rowId }) => (
          <DataGridRow<Employee> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}
```

---

# `src\App.tsx`

```tsx
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
```

---

# `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

---

# `src\styles\app.css`

```css
.app-shell {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 40px;
}

.app-container {
  max-width: 1400px;
  margin: 0 auto;
}

.app-header {
  margin-bottom: 32px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.summary-card {
  padding: 20px;
}

.layout-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  align-items: start;
}

.form-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.grid-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-x: auto;
}

.grid-actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 900px) {
  .app-shell {
    padding: 20px;
  }

  .layout-grid {
    grid-template-columns: 1fr;
  }
}
```

---

# Run the app

```powershell
npm run dev
```

---

# Validate build

```powershell
npm run build
```

---

# Technical Summary

| Concept                 | Where                  |
| ----------------------- | ---------------------- |
| TypeScript model        | `Employee.ts`          |
| Initial mock data       | `employees.ts`         |
| Dashboard derived state | `DashboardSummary.tsx` |
| Controlled form         | `EmployeeForm.tsx`     |
| Search state            | `EmployeeSearch.tsx`   |
| Fluent UI DataGrid      | `EmployeeGrid.tsx`     |
| CRUD state              | `App.tsx`              |
| Derived filtering       | `useMemo` in `App.tsx` |
| Enterprise layout       | `app.css`              |

---

# Where we are

| App | Name                       | Status    |
| --: | -------------------------- | --------- |
|  81 | Complete CRUD System       | Completed |
|  82 | Employee Management System | Current   |
|  83 | Financial Dashboard        | Next      |
