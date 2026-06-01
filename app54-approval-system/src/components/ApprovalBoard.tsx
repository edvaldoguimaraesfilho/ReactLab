import { useState } from "react";

import {
  Title1,
  Text,
} from "@fluentui/react-components";

import { approvalRequests } from "../data/approvalRequests";

import {
  ApprovalCard,
} from "./ApprovalCard";

import type {
  ApprovalRequest,
  ApprovalStatus,
} from "../models/ApprovalRequest";

export function ApprovalBoard() {
  const [requests, setRequests] =
    useState<ApprovalRequest[]>(
      approvalRequests
    );

  function handleUpdateStatus(
    id: number,
    status: ApprovalStatus
  ) {
    setRequests((currentRequests) =>
      currentRequests.map((request) => {
        if (request.id === id) {
          return {
            ...request,
            status,
          };
        }

        return request;
      })
    );
  }

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Title1>Enterprise Approval System</Title1>

      <Text>
        React and Fluent UI approval workflow dashboard.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        {requests.map((request) => (
          <ApprovalCard
            key={request.id}
            request={request}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </section>
  );
}