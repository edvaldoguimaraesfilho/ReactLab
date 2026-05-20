import { Input } from "@fluentui/react-components";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({
  search,
  onSearchChange,
}: SearchBarProps) {
  return (
    <Input
      placeholder="Search contacts..."
      value={search}
      onChange={(_, data) =>
        onSearchChange(data.value)
      }
    />
  );
}