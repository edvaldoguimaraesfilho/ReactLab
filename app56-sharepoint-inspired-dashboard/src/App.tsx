import { DashboardHeader } from "./components/DashboardHeader";
import { QuickLinks } from "./components/QuickLinks";
import { NewsSection } from "./components/NewsSection";
import { MetricsPanel } from "./components/MetricsPanel";
import { ActivityPanel } from "./components/ActivityPanel";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <DashboardHeader />

      <main
        style={{
          padding: "32px",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <MetricsPanel />
        <QuickLinks />
        <NewsSection />
        <ActivityPanel />
      </main>
    </div>
  );
}

export default App;