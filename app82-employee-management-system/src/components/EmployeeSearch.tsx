import { Field, Input } from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";

interface EmployeeSearchProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

export function EmployeeSearch({
  searchText,
  onSearchChange,
}: EmployeeSearchProps) {
  return (
    <Field label="Search employees">
      <Input
        value={searchText}
        contentBefore={<Search24Regular />}
        placeholder="Search by name, email, department, or position"
        onChange={(_, data) => onSearchChange(data.value)}
      />
    </Field>
  );
}