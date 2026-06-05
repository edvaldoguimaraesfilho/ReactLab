import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

export function ReservationStatistics(props: Props) {
  return (
    <Card>
      <Title3>Statistics</Title3>

      <Text>Total: {props.total}</Text>
      <br />

      <Text>Confirmed: {props.confirmed}</Text>
      <br />

      <Text>Pending: {props.pending}</Text>
      <br />

      <Text>Cancelled: {props.cancelled}</Text>
    </Card>
  );
}