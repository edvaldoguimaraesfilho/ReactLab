import { Text, Title1 } from "@fluentui/react-components";
import { WeatherDashboard } from "./components/WeatherDashboard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto 32px auto",
        }}
      >
        <Title1>App 65 — Weather App</Title1>

        <Text>
          A React application that consumes an external weather API using
          useEffect, TypeScript services, loading state, error state, and
          Fluent UI components.
        </Text>
      </section>

      <WeatherDashboard />
    </main>
  );
}

export default App;