import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
}

export function EmployeeList({
  employees,
  onDelete,
}: Props) {
  return (
    <>
      {employees.map((employee) => (
        <Card
          key={employee.id}
          style={{
            marginBottom: "16px",
            padding: "16px",
          }}
        >
          <Title3>{employee.name}</Title3>

          <Text>
            Department: {employee.department}
          </Text>

          <br />

          <Text>
            Email: {employee.email}
          </Text>

          <br />
          <br />

          <Button
            appearance="secondary"
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </>
  );
}