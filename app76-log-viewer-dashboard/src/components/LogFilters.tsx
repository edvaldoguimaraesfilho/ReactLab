import {
  Dropdown,
  Option,
  type OptionOnSelectData,
  type SelectionEvents,
} from "@fluentui/react-components";

import type { LogLevel } from "../models/LogEntry";

export type SeverityFilter = "All" | LogLevel;

interface LogFiltersProps {
  value: SeverityFilter;
  onChange: (value: SeverityFilter) => void;
}

export function LogFilters({ value, onChange }: LogFiltersProps) {
  function handleSelect(
    _event: SelectionEvents,
    data: OptionOnSelectData
  ) {
    onChange(data.optionValue as SeverityFilter);
  }

  return (
    <Dropdown
      value={value}
      selectedOptions={[value]}
      onOptionSelect={handleSelect}
      placeholder="Select severity"
    >
      <Option value="All">All</Option>
      <Option value="Info">Info</Option>
      <Option value="Warning">Warning</Option>
      <Option value="Error">Error</Option>
    </Dropdown>
  );
}