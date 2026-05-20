import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { ThemeCard } from "./components/ThemeCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function handleToggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        transition: "background-color 0.3s ease",
        padding: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          textAlign: "center",
        }}
      >
        <Title1
          style={{
            color: darkMode ? "#ffffff" : "#000000",
          }}
        >
          Toggle Theme
        </Title1>

        <Text
          style={{
            color: darkMode ? "#d6d6d6" : "#333333",
          }}
        >
          React state controls the visual appearance of the UI.
        </Text>

        <div
          style={{
            marginTop: "32px",
          }}
        >
          <ThemeCard
            darkMode={darkMode}
            onToggleTheme={handleToggleTheme}
          />
        </div>
      </section>
    </main>
  );
}

export default App;