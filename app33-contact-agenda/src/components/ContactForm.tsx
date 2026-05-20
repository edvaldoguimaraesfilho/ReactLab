import { useState } from "react";

import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

import type { Contact } from "../models/Contact";

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
}

export function ContactForm({
  onAddContact,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit() {
    if (
      !name.trim() ||
      !email.trim()
    ) {
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name,
      email,
      company,
      phone,
    };

    onAddContact(newContact);

    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      <Field label="Name">
        <Input
          value={name}
          onChange={(_, data) =>
            setName(data.value)
          }
        />
      </Field>

      <Field label="Email">
        <Input
          value={email}
          onChange={(_, data) =>
            setEmail(data.value)
          }
        />
      </Field>

      <Field label="Company">
        <Input
          value={company}
          onChange={(_, data) =>
            setCompany(data.value)
          }
        />
      </Field>

      <Field label="Phone">
        <Input
          value={phone}
          onChange={(_, data) =>
            setPhone(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Contact
      </Button>
    </div>
  );
}