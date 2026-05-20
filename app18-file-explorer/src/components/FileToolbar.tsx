import {
  Button,
  Input,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

import {
  Add24Regular,
  ArrowUpload24Regular,
  FolderAdd24Regular,
  Search24Regular,
} from "@fluentui/react-icons";

export function FileToolbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <Toolbar>
        <ToolbarButton icon={<Add24Regular />}>New</ToolbarButton>
        <ToolbarButton icon={<FolderAdd24Regular />}>New folder</ToolbarButton>
        <ToolbarButton icon={<ArrowUpload24Regular />}>Upload</ToolbarButton>
      </Toolbar>

      <Input
        contentBefore={<Search24Regular />}
        placeholder="Search files"
        style={{ width: "280px" }}
      />
    </div>
  );
}