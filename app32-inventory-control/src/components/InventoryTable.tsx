import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { InventoryItem } from "../models/InventoryItem";

interface InventoryTableProps {
  items: InventoryItem[];
}

export function InventoryTable({
  items,
}: InventoryTableProps) {
  return (
    <Table
      aria-label="Inventory Table"
      style={{
        marginTop: "32px",
      }}
    >
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Quantity</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.productName}</TableCell>

            <TableCell>{item.category}</TableCell>

            <TableCell>{item.quantity}</TableCell>

            <TableCell>
              $
              {item.price.toFixed(2)}
            </TableCell>

            <TableCell>
              {item.quantity <= 5 ? (
                <Badge appearance="filled">
                  Low Stock
                </Badge>
              ) : (
                <Badge appearance="tint">
                  Available
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}