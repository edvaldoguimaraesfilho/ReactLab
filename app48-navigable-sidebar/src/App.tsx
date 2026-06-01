import { useState } from "react";

import { navigationItems } from "./data/navigationItems";
import { Sidebar } from "./components/Sidebar";
import { PageContent } from "./components/PageContent";

function App() {
  const [selectedId, setSelectedId] = useState("dashboard");

  const selectedItem =
    navigationItems.find((item) => item.id === selectedId) ??
    navigationItems[0];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar
        items={navigationItems}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <PageContent selectedItem={selectedItem} />
    </div>
  );
}

export default App;