import {
  Badge,
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  createTableColumn,
  type TableColumnDefinition,
} from "@fluentui/react-components";

import {
  Delete24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";

import type { Employee } from "../models/Employee";

interface EmployeeGridProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: number) => void;
}

export function EmployeeGrid({
  employees,
  onEdit,
  onDelete,
}: EmployeeGridProps) {
  const columns: TableColumnDefinition<Employee>[] = [
    createTableColumn<Employee>({
      columnId: "name",
      renderHeaderCell: () => "Name",
      renderCell: (employee) => employee.name,
    }),

    createTableColumn<Employee>({
      columnId: "email",
      renderHeaderCell: () => "Email",
      renderCell: (employee) => employee.email,
    }),

    createTableColumn<Employee>({
      columnId: "department",
      renderHeaderCell: () => "Department",
      renderCell: (employee) => employee.department,
    }),

    createTableColumn<Employee>({
      columnId: "position",
      renderHeaderCell: () => "Position",
      renderCell: (employee) => employee.position,
    }),

    createTableColumn<Employee>({
      columnId: "status",
      renderHeaderCell: () => "Status",
      renderCell: (employee) => (
        <Badge appearance={employee.status === "Active" ? "filled" : "outline"}>
          {employee.status}
        </Badge>
      ),
    }),

    createTableColumn<Employee>({
      columnId: "actions",
      renderHeaderCell: () => "Actions",
      renderCell: (employee) => (
        <div className="grid-actions">
          <Button
            appearance="subtle"
            icon={<Edit24Regular />}
            onClick={() => onEdit(employee)}
          >
            Edit
          </Button>

          <Button
            appearance="subtle"
            icon={<Delete24Regular />}
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </Button>
        </div>
      ),
    }),
  ];

  return (
    <DataGrid items={employees} columns={columns}>
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>

      <DataGridBody<Employee>>
        {({ item, rowId }) => (
          <DataGridRow<Employee> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}