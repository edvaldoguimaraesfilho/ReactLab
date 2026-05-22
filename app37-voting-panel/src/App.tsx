import { VotingBoard } from "./components/VotingBoard";

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
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <VotingBoard />
      </div>
    </main>
  );
}

export default App;