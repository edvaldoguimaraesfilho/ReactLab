import {
  Badge,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  Title2,
} from "@fluentui/react-components";

import type { TableColumnDefinition } from "@fluentui/react-components";

import { products } from "../data/products";

import type { Product } from "../models/Product";

const columns: TableColumnDefinition<Product>[] = [
  {
    columnId: "name",
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => "Product",
    renderCell: (item) => (
      <TableCellLayout>
        {item.name}
      </TableCellLayout>
    ),
  },
  {
    columnId: "category",
    compare: (a, b) => a.category.localeCompare(b.category),
    renderHeaderCell: () => "Category",
    renderCell: (item) => item.category,
  },
  {
    columnId: "price",
    compare: (a, b) => a.price - b.price,
    renderHeaderCell: () => "Price",
    renderCell: (item) => `$ ${item.price}`,
  },
  {
    columnId: "stock",
    compare: (a, b) => a.stock - b.stock,
    renderHeaderCell: () => "Stock",
    renderCell: (item) => item.stock,
  },
  {
    columnId: "status",
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge appearance={item.status === "Active" ? "filled" : "outline"}>
        {item.status}
      </Badge>
    ),
  },
];

export function ProductDataGrid() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Title2>
        Enterprise Product Catalog
      </Title2>

      <DataGrid
        items={products}
        columns={columns}
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

        <DataGridBody<Product>>
          {({ item, rowId }) => (
            <DataGridRow<Product>
              key={rowId}
            >
              {({ renderCell }) => (
                <DataGridCell>
                  {renderCell(item)}
                </DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </section>
  );
}