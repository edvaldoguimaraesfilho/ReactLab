import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { AdminModule } from "../models/AdminModule";

interface Props {
  module: AdminModule;
}

export function AdminModuleCard({
  module,
}: Props) {
  return (
    <Card>
      <Title3>{module.name}</Title3>

      <Text>
        {module.description}
      </Text>

      <Text>
        Records: {module.users}
      </Text>
    </Card>
  );
}