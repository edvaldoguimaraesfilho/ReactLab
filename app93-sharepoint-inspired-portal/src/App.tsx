import { Title1, Text } from "@fluentui/react-components";

import { PortalHeader } from "./components/Header";
import { PortalSidebar } from "./components/Sidebar";
import { DashboardCards } from "./components/DashboardCards";
import { QuickLinks } from "./components/QuickLinks";
import { NewsSection } from "./components/NewsSection";
import { DocumentsGrid } from "./components/DocumentsGrid";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <PortalHeader />

      <div
        style={{
          display: "flex",
        }}
      >
        <PortalSidebar />

        <main
          style={{
            flex: 1,
            padding: "32px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <section>
            <Title1>SharePoint Inspired Portal</Title1>
            <Text>
              A Microsoft-style enterprise intranet built with React,
              TypeScript, Vite, and Fluent UI.
            </Text>
          </section>

          <DashboardCards />

          <QuickLinks />

          <NewsSection />

          <DocumentsGrid />
        </main>
      </div>
    </div>
  );
}

export default App;