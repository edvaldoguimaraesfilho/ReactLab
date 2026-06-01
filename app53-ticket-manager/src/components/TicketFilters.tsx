import {
  Dropdown,
  Input,
  Option,
} from "@fluentui/react-components";

interface TicketFiltersProps {
  searchText: string;
  statusFilter: string;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;
}

export function TicketFilters({
  searchText,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: TicketFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "32px",
        flexWrap: "wrap",
      }}
    >
      <Input
        placeholder="Search tickets..."
        value={searchText}
        onChange={(_, data) =>
          onSearchChange(data.value)
        }
      />

      <Dropdown
        value={statusFilter}
        placeholder="Select status"
        onOptionSelect={(_, data) =>
          onStatusChange(data.optionValue || "")
        }
      >
        <Option value="All">All</Option>

        <Option value="Open">Open</Option>

        <Option value="In Progress">
          In Progress
        </Option>

        <Option value="Resolved">
          Resolved
        </Option>
      </Dropdown>
    </div>
  );
}