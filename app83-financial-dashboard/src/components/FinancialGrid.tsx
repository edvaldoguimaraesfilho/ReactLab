import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { FinancialRecord } from "../models/FinancialRecord";

interface Props {
  records: FinancialRecord[];
}

export function FinancialGrid({
  records,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Month</TableHeaderCell>
          <TableHeaderCell>Revenue</TableHeaderCell>
          <TableHeaderCell>Expenses</TableHeaderCell>
          <TableHeaderCell>Profit</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{record.month}</TableCell>

            <TableCell>
              ${record.revenue.toLocaleString()}
            </TableCell>

            <TableCell>
              ${record.expenses.toLocaleString()}
            </TableCell>

            <TableCell>
              $
              {(
                record.revenue -
                record.expenses
              ).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}