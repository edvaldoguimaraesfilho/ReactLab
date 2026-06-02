import {
  Input,
  Button
} from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function RepositorySearch({
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <Input
        value={value}
        placeholder="Search repositories..."
        onChange={(_, data) =>
          onChange(data.value)
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