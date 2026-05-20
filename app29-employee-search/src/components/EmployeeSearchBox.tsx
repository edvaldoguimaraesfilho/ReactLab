import { Field, Input } from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";

interface EmployeeSearchBoxProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

export function EmployeeSearchBox({
  searchText,
  onSearchTextChange,
}: EmployeeSearchBoxProps) {
  return (
    <Field label="Search employees">
      <Input
        value={searchText}
        contentBefore={<Search24Regular />}
        placeholder="Search by name, role, department, location, or status"
        onChange={(_, data) => onSearchTextChange(data.value)}
      />
    </Field>
  );
}