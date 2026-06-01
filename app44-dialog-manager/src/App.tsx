import { useState } from "react";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { ActionPanel } from "./components/ActionPanel";
import { DialogManager } from "./components/DialogManager";

import type { DialogState } from "./models/DialogState";

const initialDialogState: DialogState = {
  open: false,
  type: "success",
  title: "",
  message: "",
};

function App() {
  const [dialogState, setDialogState] =
    useState<DialogState>(initialDialogState);

  function handleCloseDialog() {
    setDialogState({
      ...dialogState,
      open: false,
    });
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "420px",
          }}
        >
          <ActionPanel
            onOpenDialog={setDialogState}
          />

          <DialogManager
            dialogState={dialogState}
            onClose={handleCloseDialog}
          />
        </div>
      </main>
    </FluentProvider>
  );
}

export default App;