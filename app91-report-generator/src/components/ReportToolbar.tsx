import { Button, Toolbar, ToolbarButton } from "@fluentui/react-components";
import {
  ArrowDownload24Regular,
  DocumentAdd24Regular,
  Print24Regular,
} from "@fluentui/react-icons";

interface ReportToolbarProps {
  onGenerate: () => void;
}

export function ReportToolbar({ onGenerate }: ReportToolbarProps) {
  return (
    <Toolbar>
      <ToolbarButton icon={<DocumentAdd24Regular />} onClick={onGenerate}>
        Generate Report
      </ToolbarButton>

      <ToolbarButton icon={<ArrowDownload24Regular />}>
        Export
      </ToolbarButton>

      <ToolbarButton icon={<Print24Regular />}>
        Print
      </ToolbarButton>

      <Button appearance="primary" onClick={onGenerate}>
        New Report
      </Button>
    </Toolbar>
  );
}