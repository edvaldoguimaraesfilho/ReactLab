import { useEffect, useState } from "react";

import type { User } from "../models/User";
import { UserService } from "../services/UserService";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const data = await UserService.getUsers();

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