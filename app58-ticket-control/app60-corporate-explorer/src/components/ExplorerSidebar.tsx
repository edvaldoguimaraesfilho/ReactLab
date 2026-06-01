import { Button, Card, Text, Title3 } from "@fluentui/react-components";
import {
  Folder24Regular,
  Document24Regular,
  ChartMultiple24Regular,
  Image24Regular,
} from "@fluentui/react-icons";

export function ExplorerSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Title3>Corporate Explorer</Title3>
      <Text size={200}>Enterprise content areas</Text>

      <Button appearance="subtle" icon={<Folder24Regular />}>Folders</Button>
      <Button appearance="subtle" icon={<Document24Regular />}>Documents</Button>
      <Button appearance="subtle" icon={<ChartMultiple24Regular />}>Reports</Button>
      <Button appearance="subtle" icon={<Image24Regular />}>Images</Button>
    </Card>
  );
}