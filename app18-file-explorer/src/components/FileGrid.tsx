import {
  Badge,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Folder24Regular,
  Document24Regular,
  DocumentPdf24Regular,
  Image24Regular,
  Table24Regular,
} from "@fluentui/react-icons";

import { files } from "../data/files";
import type { FileItem } from "../models/FileItem";

function getFileIcon(type: FileItem["type"]) {
  if (type === "folder") return <Folder24Regular />;
  if (type === "word") return <Document24Regular />;
  if (type === "excel") return <Table24Regular />;
  if (type === "pdf") return <DocumentPdf24Regular />;
  return <Image24Regular />;
}

function getBadgeText(type: FileItem["type"]) {
  if (type === "folder") return "Folder";
  if (type === "word") return "Word";
  if (type === "excel") return "Excel";
  if (type === "pdf") return "PDF";
  return "Image";
}

export function FileGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px",
      }}
    >
      {files.map((file) => (
        <Card key={file.id} style={{ padding: "16px" }}>
          <CardHeader
            image={getFileIcon(file.type)}
            header={<Title3>{file.name}</Title3>}
            description={<Caption1>Owner: {file.owner}</Caption1>}
          />

          <div style={{ display: "grid", gap: "8px", marginTop: "12px" }}>
            <Text size={200}>Modified: {file.modified}</Text>
            <Text size={200}>Size: {file.size}</Text>
            <Badge appearance="tint">{getBadgeText(file.type)}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}