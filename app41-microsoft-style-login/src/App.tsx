import { LoginCard } from "./components/LoginCard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f2f1",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <LoginCard />
    </main>
  );
}

export default App;