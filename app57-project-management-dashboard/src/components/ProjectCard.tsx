import {
  Badge,
  Card,
  ProgressBar,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Project } from "../models/Project";

interface ProjectCardProps {
  project: Project;
}

function getBadgeAppearance(status: Project["status"]) {
  if (status === "Completed") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title3>{project.title}</Title3>

      <Text>
        Manager: {project.manager}
      </Text>

      <Text>
        Department: {project.department}
      </Text>

      <Badge appearance={getBadgeAppearance(project.status)}>
        {project.status}
      </Badge>

      <ProgressBar
        value={project.progress / 100}
      />

      <Text>
        Progress: {project.progress}%
      </Text>
    </Card>
  );
}