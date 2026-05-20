import { useState } from "react";

import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialContacts } from "./data/initialContacts";

import { ContactForm } from "./components/ContactForm";
import { ContactList } from "./components/ContactList";
import { SearchBar } from "./components/SearchBar";

import type { Contact } from "./models/Contact";

function App() {
  const [contacts, setContacts] =
    useState<Contact[]>(initialContacts);

  const [search, setSearch] =
    useState("");

  function handleAddContact(
    contact: Contact
  ) {
    setContacts((previousContacts) => [
      contact,
      ...previousContacts,
    ]);
  }

  const filteredContacts =
    contacts.filter((contact) =>
      contact.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Contact Agenda
        </Title1>

        <Text>
          Enterprise contact management with
          React and Fluent UI.
        </Text>

        <Card
          style={{
            marginTop: "24px",
            padding: "24px",
          }}
        >
          <SearchBar
            search={search}
            onSearchChange={setSearch}
          />

          <ContactForm
            onAddContact={handleAddContact}
          />
        </Card>

        <ContactList
          contacts={filteredContacts}
        />
      </section>
    </main>
  );
}

export default App;