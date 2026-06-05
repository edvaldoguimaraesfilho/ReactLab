import {
  Badge,
  Card,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Text,
  Title3,
  createTableColumn
} from "@fluentui/react-components";


import type {
  
  TableColumnDefinition,
  
} from "@fluentui/react-components";

import type { DocumentItem } from "../models/DocumentItem";
import { documents } from "../data/documents";

const columns: TableColumnDefinition<DocumentItem>[] = [
  createTableColumn<DocumentItem>({
    columnId: "name",
  }),
  createTableColumn<DocumentItem>({
    columnId: "department",
  }),
  createTableColumn<DocumentItem>({
    columnId: "modified",
  }),
  createTableColumn<DocumentItem>({
    columnId: "status",
  }),
];

function getStatusAppearance(status: DocumentItem["status"]) {
  if (status === "Current") {
    return "filled" as const;
  }

  if (status === "Draft") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function DocumentsGrid() {
  return (
    <section>
      <Title3>Document Library Preview</Title3>

      <Card
        style={{
          marginTop: "12px",
        }}
      >
        <DataGrid
          items={documents}
          columns={columns}
          getRowId={(item) => item.id}
          focusMode="cell"
        >
          <DataGridHeader>
            <DataGridRow>
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>
                  {renderHeaderCell()}
                </DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>

          <DataGridBody<DocumentItem>>
            {({ item, rowId }) => (
              <DataGridRow<DocumentItem> key={rowId}>
                {({ columnId }) => (
                  <DataGridCell>
                    {columnId === "name" && (
                      <Text weight="semibold">{item.name}</Text>
                    )}

                    {columnId === "department" && (
                      <Text>{item.department}</Text>
                    )}

                    {columnId === "modified" && (
                      <Text>{item.modified}</Text>
                    )}

                    {columnId === "status" && (
                      <Badge appearance={getStatusAppearance(item.status)}>
                        {item.status}
                      </Badge>
                    )}
                  </DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </Card>
    </section>
  );
}