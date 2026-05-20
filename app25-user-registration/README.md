# App 25 — User Registration

App 25 is **Cadastro de Usuário / User Registration**. It belongs to **Block 2 — Interactivity and State**, after App 24 Login and before App 26 ToDo List. The roadmap defines App 25 as **CRUD simples, Forms, validação**, connected to **Choosing the State Structure**. 

## PowerShell

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app25-user-registration -- --template react-ts
cd app25-user-registration

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\models
mkdir src\styles

New-Item src\models\UserRegistration.ts -ItemType File
New-Item src\components\UserRegistrationForm.tsx -ItemType File
```

## `src\models\UserRegistration.ts`

```ts
export interface UserRegistration {
  fullName: string;
  email: string;
  role: string;
  password: string;
}
```

## `src\components\UserRegistrationForm.tsx`

```tsx
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
```

## `src\App.tsx`

```tsx
import { UserRegistrationForm } from "./components/UserRegistrationForm";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserRegistrationForm />
    </main>
  );
}

export default App;
```

## `src\main.tsx`

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

## `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## Run

```powershell
npm run dev
npm run build
npm run preview
```

## Key lesson

This construction:

```tsx
const [formData, setFormData] =
  useState<UserRegistration>(initialFormData);
```

means:

React stores one object called `formData`.
TypeScript guarantees that this object follows the `UserRegistration` shape.
`setFormData` is the only correct way to update it.

## Where we are

| App | Name               | Status    |
| --: | ------------------ | --------- |
|  21 | Modern Counter     | Completed |
|  22 | Toggle Theme       | Completed |
|  23 | React Calculator   | Completed |
|  24 | Login Form         | Completed |
|  25 | User Registration  | Current   |
|  26 | Complete ToDo List | Next      |
