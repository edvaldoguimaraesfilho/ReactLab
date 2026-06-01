import { useEffect, useState } from "react";

import {
  Spinner,
  Title1,
} from "@fluentui/react-components";

import { getUsers } from "./services/UserService";
import { UserTable } from "./components/UserTable";
import { PaginationBar } from "./components/PaginationBar";

import type { User } from "./models/User";

const PAGE_SIZE = 3;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getUsers();

      setUsers(result);
      setLoading(false);
    }

    loadData();
  }, []);

  const totalPages =
    Math.ceil(users.length / PAGE_SIZE);

  const start =
    (page - 1) * PAGE_SIZE;

  const currentUsers =
    users.slice(start, start + PAGE_SIZE);

  if (loading) {
    return <Spinner label="Loading users..." />;
  }

  return (
    <main
      style={{
        padding: "32px",
      }}
    >
      <Title1>User Pagination System</Title1>

      <UserTable users={currentUsers} />

      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        onPrevious={() =>
          setPage((p) => p - 1)
        }
        onNext={() =>
          setPage((p) => p + 1)
        }
      />
    </main>
  );
}

export default App;