import {
  Body1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { AdminModule } from "../models/AdminModule";

interface ModuleCardProps {
  module: AdminModule;
}

export function ModuleCard({
  module,
}: ModuleCardProps) {
  return (
    <Card>
      <CardHeader
        header={<Title3>{module.title}</Title3>}
      />

      <Body1>
        {module.description}
      </Body1>

      <Text>
        Active Users: {module.users}
      </Text>
    </Card>
  );
}