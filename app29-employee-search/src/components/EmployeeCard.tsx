import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import { Person24Regular } from "@fluentui/react-icons";
import type { Employee } from "../models/Employee";

interface EmployeeCardProps {
  employee: Employee;
}

function getBadgeAppearance(status: Employee["status"]) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "Remote") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        image={<Person24Regular />}
        header={<Title3>{employee.name}</Title3>}
        description={<Caption1>{employee.role}</Caption1>}
      />

      <Body1>{employee.department}</Body1>

      <Text size={200}>Location: {employee.location}</Text>

      <div style={{ marginTop: "16px" }}>
        <Badge appearance={getBadgeAppearance(employee.status)}>
          {employee.status}
        </Badge>
      </div>
    </Card>
  );
}