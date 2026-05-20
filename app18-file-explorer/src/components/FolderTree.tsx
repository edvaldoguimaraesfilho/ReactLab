import { Button, Card, Text, Title3 } from "@fluentui/react-components";

import {
  Folder24Regular,
  Home24Regular,
  Star24Regular,
  Clock24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";

const folders = [
  { id: 1, name: "Home", icon: <Home24Regular /> },
  { id: 2, name: "My files", icon: <Folder24Regular /> },
  { id: 3, name: "Favorites", icon: <Star24Regular /> },
  { id: 4, name: "Recent", icon: <Clock24Regular /> },
  { id: 5, name: "Recycle bin", icon: <Delete24Regular /> },
];

export function FolderTree() {
  return (
    <Card
      style={{
        width: "260px",
        padding: "20px",
        minHeight: "100vh",
        borderRadius: 0,
      }}
    >
      <Title3>File Explorer</Title3>
      <Text size={200}>Corporate workspace</Text>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "24px",
        }}
      >
        {folders.map((folder) => (
          <Button
            key={folder.id}
            appearance="subtle"
            icon={folder.icon}
            style={{ justifyContent: "flex-start" }}
          >
            {folder.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}