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