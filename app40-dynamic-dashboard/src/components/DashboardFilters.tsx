import {
  Button,
  Dropdown,
  Field,
  Option,
} from "@fluentui/react-components";

import type { Department } from "../models/DashboardMetric";

interface DashboardFiltersProps {
  selectedDepartment: Department | "All";
  selectedMonth: string;
  onDepartmentChange: (department: Department | "All") => void;
  onMonthChange: (month: string) => void;
  onReset: () => void;
}

export function DashboardFilters({
  selectedDepartment,
  selectedMonth,
  onDepartmentChange,
  onMonthChange,
  onReset,
}: DashboardFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginTop: "24px",
      }}
    >
      <Field label="Department">
        <Dropdown
          value={selectedDepartment}
          selectedOptions={[selectedDepartment]}
          onOptionSelect={(_, data) =>
            onDepartmentChange(data.optionValue as Department | "All")
          }
        >
          <Option value="All">All</Option>
          <Option value="Sales">Sales</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Operations">Operations</Option>
          <Option value="Technology">Technology</Option>
        </Dropdown>
      </Field>

      <Field label="Month">
        <Dropdown
          value={selectedMonth}
          selectedOptions={[selectedMonth]}
          onOptionSelect={(_, data) =>
            onMonthChange(data.optionValue ?? "January")
          }
        >
          <Option value="January">January</Option>
          <Option value="February">February</Option>
        </Dropdown>
      </Field>

      <Button appearance="secondary" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}