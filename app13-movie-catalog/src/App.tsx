import { Text, Title1 } from "@fluentui/react-components";
import { MovieCatalog } from "./components/MovieCatalog";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1 style={{ color: "white" }}>Movie Catalog</Title1>

        <Text style={{ color: "#d1d5db" }}>
          A static Netflix-style movie catalog built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <MovieCatalog />
      </section>
    </main>
  );
}

export default App;