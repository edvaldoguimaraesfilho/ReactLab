import { Dropdown, Option } from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ReportFilter({
  value,
  onChange,
}: Props) {
  return (
    <Dropdown
      placeholder="Select category"
      value={value}
      selectedOptions={value ? [value] : []}
      onOptionSelect={(_, data) =>
        onChange(data.optionValue ?? "")
      }
    >
      <Option value="">All</Option>
      <Option value="Finance">Finance</Option>
      <Option value="Sales">Sales</Option>
      <Option value="HR">HR</Option>
      <Option value="Operations">Operations</Option>
    </Dropdown>
  );
}