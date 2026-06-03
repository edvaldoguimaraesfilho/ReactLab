import { useEffect, useState } from "react";

import type { Employee } from "../models/Employee";

import { getEmployees } from "../services/employeeService";

export function useEmployees() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getEmployees();

      setEmployees(data);
      setLoading(false);
    }

    loadData();
  }, []);

  return {
    employees,
    loading,
  };
}