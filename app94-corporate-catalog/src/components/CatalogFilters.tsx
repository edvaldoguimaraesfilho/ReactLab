import {
  Input,
} from "@fluentui/react-components";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export function CatalogFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <Input
      placeholder="Search catalog..."
      value={search}
      onChange={(_, data) =>
        onSearchChange(data.value)
      }
    />
  );
}