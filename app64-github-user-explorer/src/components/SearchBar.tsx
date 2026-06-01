import {
  Button,
  Input,
} from "@fluentui/react-components";

interface SearchBarProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  username,
  onUsernameChange,
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
        placeholder="Enter GitHub username"
        value={username}
        onChange={(_, data) =>
          onUsernameChange(data.value)
        }
      />

      <Button
        appearance="primary"
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
}