import { Card, Text, Title2 } from "@fluentui/react-components";
import type { Employee } from "../models/Employee";

interface DashboardSummaryProps {
  employees: Employee[];
}

export function DashboardSummary({ employees }: DashboardSummaryProps) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const totalDepartments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  return (
    <section className="summary-grid">
      <Card className="summary-card">
        <Text>Total Employees</Text>
        <Title2>{totalEmployees}</Title2>
      </Card>

      <Card className="summary-card">
        <Text>Active Employees</Text>
        <Title2>{activeEmployees}</Title2>
      </Card>

      <Card className="summary-card">
        <Text>Inactive Employees</Text>
        <Title2>{inactiveEmployees}</Title2>
      </Card>

      <Card className="summary-card">
        <Text>Departments</Text>
        <Title2>{totalDepartments}</Title2>
      </Card>
    </section>
  );
}