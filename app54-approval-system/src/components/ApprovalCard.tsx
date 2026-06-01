import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  Clock24Regular,
} from "@fluentui/react-icons";

import type {
  ApprovalRequest,
  ApprovalStatus,
} from "../models/ApprovalRequest";

interface ApprovalCardProps {
  request: ApprovalRequest;
  onUpdateStatus: (
    id: number,
    status: ApprovalStatus
  ) => void;
}

function getStatusIcon(status: ApprovalStatus) {
  if (status === "Approved") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "Rejected") {
    return <DismissCircle24Regular />;
  }

  return <Clock24Regular />;
}

function getBadgeAppearance(status: ApprovalStatus) {
  if (status === "Approved") {
    return "filled" as const;
  }

  if (status === "Rejected") {
    return "outline" as const;
  }

  return "tint" as const;
}

export function ApprovalCard({
  request,
  onUpdateStatus,
}: ApprovalCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(request.status)}
        header={<Title3>{request.title}</Title3>}
        description={
          <Text>
            {request.requester} — {request.department}
          </Text>
        }
      />

      <Text>{request.description}</Text>

      <Badge appearance={getBadgeAppearance(request.status)}>
        {request.status}
      </Badge>

      {request.status === "Pending" && (
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Button
            appearance="primary"
            onClick={() =>
              onUpdateStatus(request.id, "Approved")
            }
          >
            Approve
          </Button>

          <Button
            appearance="secondary"
            onClick={() =>
              onUpdateStatus(request.id, "Rejected")
            }
          >
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
}