import { useEffect, useState } from "react";

import type { User } from "../models/User";

import { getUsers } from "../services/UserService";

export function useCachedUsers() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadUsers() {

      const data = await getUsers();

      setUsers(data);

      setLoading(false);
    }

    loadUsers();

  }, []);

  return {
    users,
    loading,
  };
}