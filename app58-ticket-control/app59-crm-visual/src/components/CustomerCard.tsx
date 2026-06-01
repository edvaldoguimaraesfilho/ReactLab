import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Person24Regular,
} from "@fluentui/react-icons";

import type { Customer } from "../models/Customer";

interface CustomerCardProps {
  customer: Customer;
}

function getBadgeAppearance(
  status: Customer["status"]
) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "Pending") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function CustomerCard({
  customer,
}: CustomerCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={<Person24Regular />}
        header={
          <Title3>
            {customer.company}
          </Title3>
        }
        description={
          <Caption1>
            {customer.contact}
          </Caption1>
        }
      />

      <Body1>
        {customer.email}
      </Body1>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Badge
          appearance={getBadgeAppearance(
            customer.status
          )}
        >
          {customer.status}
        </Badge>

        <Text weight="semibold">
          {customer.revenue}
        </Text>
      </div>
    </Card>
  );
}