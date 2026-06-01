import {
  Button,
  Card,
  Text,
  Title2,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";

import { toolbarActions } from "../data/toolbarActions";

export function EnterpriseToolbar() {
  return (
    <Card
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title2>Enterprise Toolbar</Title2>

      <Text>
        Professional Fluent UI toolbar with enterprise actions.
      </Text>

      <Toolbar
        aria-label="Enterprise toolbar"
      >
        {toolbarActions.map((action, index) => (
          <div
            key={action.id}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ToolbarButton
              appearance={action.appearance}
              icon={action.icon}
            >
              {action.title}
            </ToolbarButton>

            {index < toolbarActions.length - 1 && (
              <ToolbarDivider />
            )}
          </div>
        ))}
      </Toolbar>
    </Card>
  );
}