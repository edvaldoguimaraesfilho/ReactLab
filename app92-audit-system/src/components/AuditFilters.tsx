import {
  Input,
} from "@fluentui/react-components";

interface AuditFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function AuditFilters({
  search,
  onSearchChange,
}: AuditFiltersProps) {
  return (
    <Input
      placeholder="Search audits..."
      value={search}
      onChange={(_, data) =>
        onSearchChange(data.value)
      }
    />
  );
}