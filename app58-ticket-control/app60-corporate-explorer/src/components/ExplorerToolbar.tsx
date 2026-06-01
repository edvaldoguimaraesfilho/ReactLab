import { Button, Input, Toolbar, ToolbarButton } from "@fluentui/react-components";
import {
  Add24Regular,
  ArrowUpload24Regular,
  Search24Regular,
} from "@fluentui/react-icons";

export function ExplorerToolbar() {
  return (
    <Toolbar
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <ToolbarButton icon={<Add24Regular />}>New</ToolbarButton>
        <ToolbarButton icon={<ArrowUpload24Regular />}>Upload</ToolbarButton>
      </div>

      <Input
        contentBefore={<Search24Regular />}
        placeholder="Search corporate content"
      />
    </Toolbar>
  );
}