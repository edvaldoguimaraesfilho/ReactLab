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
  Title3,
} from "@fluentui/react-components";


import type {TableColumnDefinition} from "@fluentui/react-components";

import { salesRecords } from "../data/dashboardData";
import type { SalesRecord } from "../models/SalesRecord";

const columns: TableColumnDefinition<SalesRecord>[] = [
  createTableColumn<SalesRecord>({
    columnId: "region",
    renderHeaderCell: () => "Region",
    renderCell: (item) => item.region,
  }),
  createTableColumn<SalesRecord>({
    columnId: "revenue",
    renderHeaderCell: () => "Revenue",
    renderCell: (item) => `$${item.revenue.toLocaleString()}`,
  }),
  createTableColumn<SalesRecord>({
    columnId: "target",
    renderHeaderCell: () => "Target",
    renderCell: (item) => `$${item.target.toLocaleString()}`,
  }),
  createTableColumn<SalesRecord>({
    columnId: "customers",
    renderHeaderCell: () => "Customers",
    renderCell: (item) => item.customers.toLocaleString(),
  }),
  createTableColumn<SalesRecord>({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge appearance={item.status === "Above Target" ? "filled" : "outline"}>
        {item.status}
      </Badge>
    ),
  }),
];

export function SalesTable() {
  return (
    <Card style={{ padding: "24px" }}>
      <Title3>Sales by Region</Title3>

      <DataGrid
        items={salesRecords}
        columns={columns}
        getRowId={(item) => item.id}
        style={{ marginTop: "20px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<SalesRecord>>
          {({ item, rowId }) => (
            <DataGridRow<SalesRecord> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
}