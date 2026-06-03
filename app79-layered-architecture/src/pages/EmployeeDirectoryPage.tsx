import {
  Spinner,
  Title1,
} from "@fluentui/react-components";

import { EmployeeCard }
  from "../components/EmployeeCard";

import { useEmployees }
  from "../hooks/useEmployees";

export function EmployeeDirectoryPage() {
  const {
    employees,
    loading,
  } = useEmployees();

  if (loading) {
    return <Spinner label="Loading employees..." />;
  }

  return (
    <>
      <Title1>
        Employee Directory
      </Title1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
          />
        ))}
      </div>
    </>
  );
}