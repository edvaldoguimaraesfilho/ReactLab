import {
  Body1,
  Card,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  employee: Employee;
}

export function EmployeeCard({
  employee,
}: Props) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{employee.name}</Title3>

      <Body1>
        {employee.role}
      </Body1>

      <Body1>
        {employee.department}
      </Body1>
    </Card>
  );
}