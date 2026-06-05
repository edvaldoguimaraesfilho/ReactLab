import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { CatalogDashboard } from "./components/CatalogDashboard";
import { CatalogFilters } from "./components/CatalogFilters";
import { CatalogGrid } from "./components/CatalogGrid";

import { getCatalogItems } from "./services/catalogService";

function App() {
  const [search, setSearch] = useState("");

  const catalog = getCatalogItems();

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [catalog, search]);

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Corporate Catalog
        </Title1>

        <CatalogDashboard
          totalItems={catalog.length}
          availableItems={
            catalog.filter(
              (x) => x.status === "Available"
            ).length
          }
        />

        <CatalogFilters
          search={search}
          onSearchChange={setSearch}
        />

        <CatalogGrid
          items={filteredCatalog}
        />
      </main>
    </FluentProvider>
  );
}

export default App;