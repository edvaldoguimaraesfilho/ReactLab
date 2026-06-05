import {
  Button,
  Field,
  Input,
  Card,
  Title3,
} from "@fluentui/react-components";

interface Props {
  customerName: string;
  resourceName: string;
  reservationDate: string;
  setCustomerName: (value: string) => void;
  setResourceName: (value: string) => void;
  setReservationDate: (value: string) => void;
  onAddReservation: () => void;
}

export function ReservationForm(props: Props) {
  return (
    <Card>
      <Title3>Create Reservation</Title3>

      <Field label="Customer">
        <Input
          value={props.customerName}
          onChange={(_, data) =>
            props.setCustomerName(data.value)
          }
        />
      </Field>

      <Field label="Resource">
        <Input
          value={props.resourceName}
          onChange={(_, data) =>
            props.setResourceName(data.value)
          }
        />
      </Field>

      <Field label="Date">
        <Input
          type="date"
          value={props.reservationDate}
          onChange={(_, data) =>
            props.setReservationDate(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={props.onAddReservation}
      >
        Create Reservation
      </Button>
    </Card>
  );
}