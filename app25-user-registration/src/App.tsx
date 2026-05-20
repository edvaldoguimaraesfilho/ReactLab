import { UserRegistrationForm } from "./components/UserRegistrationForm";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserRegistrationForm />
    </main>
  );
}

export default App;