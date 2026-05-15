import { Sidebar } from "./components/Sidebar";
import { DashboardContent } from "./components/DashboardContent";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <DashboardContent />
    </div>
  );
}

export default App;