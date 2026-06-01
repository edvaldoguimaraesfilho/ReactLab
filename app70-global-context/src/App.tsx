import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import {
  UserProvider,
} from "./contexts/UserContext";

import {
  UserDashboard,
} from "./components/UserDashboard";

import {
  UserProfile,
} from "./components/UserProfile";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <UserProvider>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <UserDashboard />

          <UserProfile />
        </main>
      </UserProvider>
    </FluentProvider>
  );
}

export default App;