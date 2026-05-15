import { Title1, Body1 } from "@fluentui/react-components";

import { MicrosoftUserCard } from "./components/MicrosoftUserCard";
import { users } from "./data/users";

import "./styles/app.css";

export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <Title1>App 04 — Microsoft Style User Cards</Title1>

        <Body1>
          This app demonstrates reusable React components, typed props,
          static data rendering, and Fluent UI enterprise visual patterns.
        </Body1>
      </section>

      <section className="cards-grid">
        {users.map((user) => (
          <MicrosoftUserCard key={user.id} user={user} />
        ))}
      </section>
    </main>
  );
}