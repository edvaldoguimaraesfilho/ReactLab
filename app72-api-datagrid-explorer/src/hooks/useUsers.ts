import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { getUsers } from "../services/UserService";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("Unable to load data.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
}