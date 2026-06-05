import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";

import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
        }}
      >
        <AdminSidebar />

        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <AdminHeader />

          <Routes>
            <Route
              path="/"
              element={<DashboardPage />}
            />

            <Route
              path="/users"
              element={<UsersPage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;