import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "@fluentui/react-components";

import type { Reservation } from "../models/Reservation";

interface Props {
  reservations: Reservation[];
  onCancel: (id: number) => void;
}

export function ReservationGrid({
  reservations,
  onCancel,
}: Props) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Resource</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.customerName}
              </TableCell>

              <TableCell>
                {reservation.resourceName}
              </TableCell>

              <TableCell>
                {reservation.reservationDate}
              </TableCell>

              <TableCell>
                <Badge>
                  {reservation.status}
                </Badge>
              </TableCell>

              <TableCell>
                <Button
                  appearance="secondary"
                  onClick={() =>
                    onCancel(reservation.id)
                  }
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}