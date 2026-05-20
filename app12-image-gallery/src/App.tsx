import { Text, Title1 } from "@fluentui/react-components";
import { GalleryGrid } from "./components/GalleryGrid";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>Image Gallery</Title1>

        <Text>
          A responsive image gallery built with React, TypeScript, and Fluent UI.
        </Text>

        <GalleryGrid />
      </section>
    </main>
  );
}

export default App;