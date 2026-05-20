import { useState } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { UserRegistration } from "../models/UserRegistration";

const initialFormData: UserRegistration = {
  fullName: "",
  email: "",
  role: "",
  password: "",
};

export function UserRegistrationForm() {
  const [formData, setFormData] =
    useState<UserRegistration>(initialFormData);

  const [message, setMessage] = useState("");

  const isFullNameValid = formData.fullName.trim().length >= 3;
  const isEmailValid = formData.email.includes("@");
  const isRoleValid = formData.role.trim().length >= 2;
  const isPasswordValid = formData.password.length >= 6;

  const isFormValid =
    isFullNameValid &&
    isEmailValid &&
    isRoleValid &&
    isPasswordValid;

  function updateField(field: keyof UserRegistration, value: string) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handleSubmit() {
    if (!isFormValid) {
      setMessage("Please complete all fields correctly.");
      return;
    }

    setMessage(`User ${formData.fullName} registered successfully.`);
    setFormData(initialFormData);
  }

  return (
    <Card style={{ maxWidth: "520px", padding: "24px" }}>
      <Title2>User Registration</Title2>

      <Text>
        A controlled form using React state, TypeScript, validation, and Fluent UI.
      </Text>

      <Field label="Full name" validationMessage={
        formData.fullName && !isFullNameValid
          ? "Full name must have at least 3 characters."
          : undefined
      }>
        <Input
          value={formData.fullName}
          onChange={(_, data) => updateField("fullName", data.value)}
        />
      </Field>

      <Field label="Email" validationMessage={
        formData.email && !isEmailValid
          ? "Email must contain @."
          : undefined
      }>
        <Input
          value={formData.email}
          onChange={(_, data) => updateField("email", data.value)}
        />
      </Field>

      <Field label="Role" validationMessage={
        formData.role && !isRoleValid
          ? "Role must have at least 2 characters."
          : undefined
      }>
        <Input
          value={formData.role}
          onChange={(_, data) => updateField("role", data.value)}
        />
      </Field>

      <Field label="Password" validationMessage={
        formData.password && !isPasswordValid
          ? "Password must have at least 6 characters."
          : undefined
      }>
        <Input
          type="password"
          value={formData.password}
          onChange={(_, data) => updateField("password", data.value)}
        />
      </Field>

      <Button
        appearance="primary"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Register User
      </Button>

      {message && (
        <MessageBar>
          <MessageBarBody>{message}</MessageBarBody>
        </MessageBar>
      )}
    </Card>
  );
}