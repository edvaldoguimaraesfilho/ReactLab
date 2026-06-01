import { AdminDashboard } from "./components/AdminDashboard";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <AdminHeader />
        <AdminDashboard />
      </main>
    </div>
  );
}

export default App;