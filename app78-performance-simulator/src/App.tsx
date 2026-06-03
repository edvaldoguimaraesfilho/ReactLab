import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1
} from "@fluentui/react-components";

import { employees }
from "./data/employeeData";

import { SearchBar }
from "./components/SearchBar";

import { EmployeeGrid }
from "./components/EmployeeGrid";

import { PerformanceSummary }
from "./components/PerformanceSummary";

import {
  calculateAverageScore,
  getTopPerformers
}
from "./services/performanceService";

function App() {

  const [search, setSearch] =
    useState("");

  const filteredEmployees =
    useMemo(() => {

      return employees.filter(
        employee =>
          employee.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [search]);

  const averageScore =
    useMemo(
      () =>
        calculateAverageScore(
          filteredEmployees
        ),
      [filteredEmployees]
    );

  const topPerformers =
    useMemo(
      () =>
        getTopPerformers(
          filteredEmployees
        ),
      [filteredEmployees]
    );

  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: 40
        }}
      >
        <Title1>
          Performance Simulator
        </Title1>

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <PerformanceSummary
          total={filteredEmployees.length}
          average={averageScore}
          topPerformers={topPerformers}
        />

        <EmployeeGrid
          employees={filteredEmployees}
        />
      </main>
    </FluentProvider>
  );
}

export default App;