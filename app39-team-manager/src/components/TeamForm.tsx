import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

import { useState } from "react";

interface TeamFormProps {
  onAddTeam: (
    name: string,
    department: string,
    leader: string,
    members: number
  ) => void;
}

export function TeamForm({
  onAddTeam,
}: TeamFormProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [leader, setLeader] = useState("");
  const [members, setMembers] = useState("");

  function handleSubmit() {
    if (
      !name ||
      !department ||
      !leader ||
      !members
    ) {
      return;
    }

    onAddTeam(
      name,
      department,
      leader,
      Number(members)
    );

    setName("");
    setDepartment("");
    setLeader("");
    setMembers("");
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "32px",
      }}
    >
      <Field label="Team Name">
        <Input
          value={name}
          onChange={(e, data) =>
            setName(data.value)
          }
        />
      </Field>

      <Field label="Department">
        <Input
          value={department}
          onChange={(e, data) =>
            setDepartment(data.value)
          }
        />
      </Field>

      <Field label="Leader">
        <Input
          value={leader}
          onChange={(e, data) =>
            setLeader(data.value)
          }
        />
      </Field>

      <Field label="Members">
        <Input
          type="number"
          value={members}
          onChange={(e, data) =>
            setMembers(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Team
      </Button>
    </div>
  );
}