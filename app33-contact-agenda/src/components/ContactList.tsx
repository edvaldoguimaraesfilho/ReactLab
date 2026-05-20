import { ContactCard } from "./ContactCard";

import type { Contact } from "../models/Contact";

interface ContactListProps {
  contacts: Contact[];
}

export function ContactList({
  contacts,
}: ContactListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "24px",
      }}
    >
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
        />
      ))}
    </div>
  );
}