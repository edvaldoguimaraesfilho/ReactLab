import { useState } from "react";

import {
  Card,
  Title1
} from "@fluentui/react-components";

import { useUsers }
from "../contexts/UserContext";

import { UserSearch }
from "./UserSearch";

import { UserGrid }
from "./UserGrid";

import { UserForm }
from "./UserForm";

export function UserDashboard() {

  const { users } = useUsers();

  const [search, setSearch] =
    useState("");

  const filteredUsers =
    users.filter(user =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <Card
      style={{
        padding: "24px"
      }}
    >
      <Title1>
        User Management System
      </Title1>

      <UserForm />

      <br />

      <UserSearch
        value={search}
        onChange={setSearch}
      />

      <br />

      <UserGrid
        users={filteredUsers}
      />
    </Card>
  );
}