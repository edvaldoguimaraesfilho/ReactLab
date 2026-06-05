import {
  FluentProvider,
  webLightTheme
} from "@fluentui/react-components";

import {
  UserProvider
} from "./contexts/UserContext";

import {
  UserDashboard
} from "./components/UserDashboard";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <UserProvider>
        <UserDashboard />
      </UserProvider>
    </FluentProvider>
  );
}

export default App;