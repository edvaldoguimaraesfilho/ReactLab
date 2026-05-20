import { BmiCalculatorCard } from "./components/BmiCalculatorCard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f2f1",
        padding: "24px",
      }}
    >
      <BmiCalculatorCard />
    </main>
  );
}

export default App;