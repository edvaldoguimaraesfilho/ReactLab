import {
  Card,
  Text
} from "@fluentui/react-components";

import type {
  EmployeePerformance
} from "../models/EmployeePerformance";

interface Props {
  employees: EmployeePerformance[];
}

export function EmployeeGrid({
  employees,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      {employees.map(employee => (
        <Card key={employee.id}>
          <Text>
            {employee.name}
          </Text>

          <br />

          <Text>
            {employee.department}
          </Text>

          <br />

          <Text>
            Score: {employee.score}
          </Text>
        </Card>
      ))}
    </div>
  );
}