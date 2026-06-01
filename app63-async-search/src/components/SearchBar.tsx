import {
  Button,
  Input,
} from "@fluentui/react-components";

import {
  Search24Regular,
} from "@fluentui/react-icons";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
      }}
    >
      <Input
        value={query}
        placeholder="Search users..."
        onChange={(_, data) =>
          onQueryChange(data.value)
        }
      />

      <Button
        appearance="primary"
        icon={<Search24Regular />}
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
}