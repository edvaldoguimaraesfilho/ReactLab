import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import {
  FavoritesProvider,
} from "./context/FavoritesContext";

import {
  ProductList,
} from "./components/ProductList";

import {
  FavoritesPanel,
} from "./components/FavoritesPanel";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <FavoritesProvider>

        <main
          style={{
            padding: "40px",
            display: "grid",
            gap: "32px",
          }}
        >
          <FavoritesPanel />

          <ProductList />

        </main>

      </FavoritesProvider>
    </FluentProvider>
  );
}

export default App;