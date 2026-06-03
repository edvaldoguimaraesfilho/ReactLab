import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { AppProvider } from "./context/AppContext";

import { MainLayout } from "./layouts/MainLayout";

import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <AppProvider>
        <MainLayout>
          <DashboardPage />
        </MainLayout>
      </AppProvider>
    </FluentProvider>
  );
}

export default App;