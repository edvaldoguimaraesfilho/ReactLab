import { CorporateForm } from "./components/CorporateForm";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <CorporateForm />
    </main>
  );
}

export default App;