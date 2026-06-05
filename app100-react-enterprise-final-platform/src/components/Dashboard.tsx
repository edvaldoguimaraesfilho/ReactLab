import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { modules } from "../data/modules";
import { ModuleCard } from "./ModuleCard";

export function Dashboard() {
  return (
    <main
      style={{
        flex: 1,
        padding: "32px",
      }}
    >
      <Title1>
        React Enterprise Final Platform
      </Title1>

      <Text>
        Complete enterprise dashboard built with React,
        TypeScript, Vite and Fluent UI.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
          />
        ))}
      </div>
    </main>
  );
}