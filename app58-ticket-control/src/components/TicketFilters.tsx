import { Button, Card, Input, Text } from "@fluentui/react-components";

interface TicketFiltersProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export function TicketFilters({
  searchText,
  onSearchChange,
  onClear,
}: TicketFiltersProps) {
  return (
    <Card style={{ marginTop: "24px", padding: "20px" }}>
      <Text weight="semibold">Search tickets</Text>

      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <Input
          placeholder="Search by title, requester, or department"
          value={searchText}
          onChange={(_, data) => onSearchChange(data.value)}
          style={{ flex: 1 }}
        />

        <Button onClick={onClear}>Clear</Button>
      </div>
    </Card>
  );
}