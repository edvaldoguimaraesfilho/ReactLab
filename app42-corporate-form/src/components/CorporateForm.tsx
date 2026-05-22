import { useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Field,
  Input,
  Text,
  Title2,
  Dropdown,
  Option,
} from "@fluentui/react-components";

import type { EmployeeFormData } from "../models/EmployeeFormData";

const initialFormData: EmployeeFormData = {
  fullName: "",
  email: "",
  department: "",
  role: "",
  active: true,
};

export function CorporateForm() {
  const [formData, setFormData] =
    useState<EmployeeFormData>(initialFormData);

  const isNameValid =
    formData.fullName.trim().length >= 3;

  const isEmailValid =
    formData.email.includes("@");

  const isDepartmentValid =
    formData.department.length > 0;

  const isRoleValid =
    formData.role.trim().length >= 2;

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isDepartmentValid &&
    isRoleValid;

  function handleSubmit() {
    alert("Employee successfully registered.");
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <Title2>
          Corporate Employee Form
        </Title2>

        <Text>
          Enterprise registration form using Fluent UI.
        </Text>
      </div>

      <Field label="Full Name">
        <Input
          value={formData.fullName}
          onChange={(_, data) =>
            setFormData({
              ...formData,
              fullName: data.value,
            })
          }
          placeholder="Enter employee name"
        />
      </Field>

      <Field label="Corporate Email">
        <Input
          value={formData.email}
          onChange={(_, data) =>
            setFormData({
              ...formData,
              email: data.value,
            })
          }
          placeholder="Enter corporate email"
        />
      </Field>

      <Field label="Department">
        <Dropdown
          placeholder="Select department"
          value={formData.department}
          onOptionSelect={(_, data) =>
            setFormData({
              ...formData,
              department: data.optionValue ?? "",
            })
          }
        >
          <Option value="IT">IT</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Operations">Operations</Option>
        </Dropdown>
      </Field>

      <Field label="Role">
        <Input
          value={formData.role}
          onChange={(_, data) =>
            setFormData({
              ...formData,
              role: data.value,
            })
          }
          placeholder="Enter role"
        />
      </Field>

      <Checkbox
        checked={formData.active}
        label="Employee is active"
        onChange={(_, data) =>
          setFormData({
            ...formData,
            active: !!data.checked,
          })
        }
      />

      <Button
        appearance="primary"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Register Employee
      </Button>

      {!isFormValid && (
        <Text>
          Please complete all required fields.
        </Text>
      )}
    </Card>
  );
}