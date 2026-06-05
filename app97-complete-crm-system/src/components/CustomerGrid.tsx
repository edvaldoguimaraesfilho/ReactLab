import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Customer } from "../models/Customer";

interface Props {
  customers: Customer[];
}

export function CustomerGrid({
  customers,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Company</TableHeaderCell>
          <TableHeaderCell>Contact</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Revenue</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.company}</TableCell>
            <TableCell>{customer.contact}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.status}</TableCell>
            <TableCell>
              ${customer.annualRevenue.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}