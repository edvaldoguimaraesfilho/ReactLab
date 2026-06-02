import { Dropdown, Option } from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function LogFilters({
  value,
  onChange,
}: Props) {
  return (
    <Dropdown
      value={value}
      placeholder="Select severity"
    >
      <Option onClick={() => onChange("All")}>
        All
      </Option>

      <Option onClick={() => onChange("Info")}>
        Info
      </Option>

      <Option onClick={() => onChange("Warning")}>
        Warning
      </Option>

      <Option onClick={() => onChange("Error")}>
        Error
      </Option>
    </Dropdown>
  );
}