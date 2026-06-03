import {
  Input
} from "@fluentui/react-components";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <Input
      placeholder="Search employee..."
      value={value}
      onChange={(_, data) =>
        onChange(data.value)
      }
    />
  );
}