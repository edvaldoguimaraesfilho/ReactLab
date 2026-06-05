import {
  Badge,
  Card,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  createTableColumn,
} from "@fluentui/react-components";

import type {
  TableColumnDefinition,
} from "@fluentui/react-components";

import type { AuditRecord } from "../models/AuditRecord";

const columns: TableColumnDefinition<AuditRecord>[] = [
  createTableColumn<AuditRecord>({
    columnId: "timestamp",
    renderHeaderCell: () => "Timestamp",
    renderCell: (item) => item.timestamp,
  }),
  createTableColumn<AuditRecord>({
    columnId: "user",
    renderHeaderCell: () => "User",
    renderCell: (item) => item.user,
  }),
  createTableColumn<AuditRecord>({
    columnId: "action",
    renderHeaderCell: () => "Action",
    renderCell: (item) => item.action,
  }),
  createTableColumn<AuditRecord>({
    columnId: "resource",
    renderHeaderCell: () => "Resource",
    renderCell: (item) => item.resource,
  }),
  createTableColumn<AuditRecord>({
    columnId: "severity",
    renderHeaderCell: () => "Severity",
    renderCell: (item) => item.severity,
  }),
  createTableColumn<AuditRecord>({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge appearance="filled">
        {item.status}
      </Badge>
    ),
  }),
];

interface AuditGridProps {
  items: AuditRecord[];
}

export function AuditGrid({ items }: AuditGridProps) {
  return (
    <Card>
      <DataGrid items={items} columns={columns}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>
                {renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<AuditRecord>>
          {({ item, rowId }) => (
            <DataGridRow<AuditRecord> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>
                  {renderCell(item)}
                </DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
}