import {
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";
import { employees } from "../data/employees";

function getBadgeAppearance(status: Employee["status"]) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "On Leave") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EmployeeTable() {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "32px",
      }}
    >
      <Title3>Employee Directory</Title3>

      <Table aria-label="Employee table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Employee</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <TableCellLayout
                  media={
                    <Avatar
                      name={employee.name}
                      color="colorful"
                    />
                  }
                >
                  {employee.name}
                </TableCellLayout>
              </TableCell>

              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.location}</TableCell>

              <TableCell>
                <Badge appearance={getBadgeAppearance(employee.status)}>
                  {employee.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}