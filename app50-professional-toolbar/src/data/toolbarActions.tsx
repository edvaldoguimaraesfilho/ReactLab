import {
  Add24Regular,
  Delete24Regular,
  Edit24Regular,
  Save24Regular,
  Folder24Regular,
  Document24Regular,
} from "@fluentui/react-icons";

import type { ToolbarAction } from "../models/ToolbarAction";

export const toolbarActions: ToolbarAction[] = [
  {
    id: 1,
    title: "New",
    icon: <Add24Regular />,
    appearance: "primary",
  },
  {
    id: 2,
    title: "Edit",
    icon: <Edit24Regular />,
    appearance: "subtle",
  },
  {
    id: 3,
    title: "Save",
    icon: <Save24Regular />,
    appearance: "subtle",
  },
  {
    id: 4,
    title: "Documents",
    icon: <Document24Regular />,
    appearance: "transparent",
  },
  {
    id: 5,
    title: "Folders",
    icon: <Folder24Regular />,
    appearance: "transparent",
  },
  {
    id: 6,
    title: "Delete",
    icon: <Delete24Regular />,
    appearance: "subtle",
  },
];