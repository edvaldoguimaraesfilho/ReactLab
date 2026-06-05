import {
  Input
} from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch(
  { value, onChange }: Props
) {
  return (
    <Input
      placeholder="Search user..."
      value={value}
      onChange={(_, data) =>
        onChange(data.value)
      }
    />
  );
}