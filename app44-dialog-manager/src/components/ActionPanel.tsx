import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Delete24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { DialogState } from "../models/DialogState";

interface ActionPanelProps {
  onOpenDialog: (dialog: DialogState) => void;
}

export function ActionPanel({
  onOpenDialog,
}: ActionPanelProps) {
  return (
    <Card
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Title2>Enterprise Actions</Title2>

      <Text>
        Select an action to open a Fluent UI dialog.
      </Text>

      <Button
        appearance="primary"
        icon={<CheckmarkCircle24Regular />}
        onClick={() =>
          onOpenDialog({
            open: true,
            type: "success",
            title: "Operation Completed",
            message:
              "The enterprise process completed successfully.",
          })
        }
      >
        Success Dialog
      </Button>

      <Button
        appearance="secondary"
        icon={<Warning24Regular />}
        onClick={() =>
          onOpenDialog({
            open: true,
            type: "warning",
            title: "Warning",
            message:
              "Please review the corporate policy settings.",
          })
        }
      >
        Warning Dialog
      </Button>

      <Button
        appearance="outline"
        icon={<Delete24Regular />}
        onClick={() =>
          onOpenDialog({
            open: true,
            type: "delete",
            title: "Delete Record",
            message:
              "This action cannot be undone.",
          })
        }
      >
        Delete Dialog
      </Button>
    </Card>
  );
}