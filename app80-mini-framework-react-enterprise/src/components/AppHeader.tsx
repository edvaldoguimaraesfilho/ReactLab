import {
  Card,
  Title2,
} from "@fluentui/react-components";

import { useAppContext } from "../context/AppContext";

export function AppHeader() {
  const { title } = useAppContext();

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title2>{title}</Title2>
    </Card>
  );
}