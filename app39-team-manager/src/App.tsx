import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { useState } from "react";

import { TeamForm } from "./components/TeamForm";
import { TeamList } from "./components/TeamList";

import { initialTeams } from "./data/initialTeams";

import type { Team } from "./models/Team";

function App() {
  const [teams, setTeams] =
    useState<Team[]>(initialTeams);

  function handleAddTeam(
    name: string,
    department: string,
    leader: string,
    members: number
  ) {
    const newTeam: Team = {
      id: Date.now(),
      name,
      department,
      leader,
      members,
    };

    setTeams([...teams, newTeam]);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Team Manager
        </Title1>

        <Text>
          Manage enterprise teams using React state and
          Fluent UI components.
        </Text>

        <TeamForm
          onAddTeam={handleAddTeam}
        />

        <TeamList teams={teams} />
      </section>
    </main>
  );
}

export default App;