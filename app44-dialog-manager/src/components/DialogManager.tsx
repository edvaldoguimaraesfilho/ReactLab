import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text,
} from "@fluentui/react-components";

import type { DialogState } from "../models/DialogState";

interface DialogManagerProps {
  dialogState: DialogState;
  onClose: () => void;
}

export function DialogManager({
  dialogState,
  onClose,
}: DialogManagerProps) {
  return (
    <Dialog open={dialogState.open}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {dialogState.title}
          </DialogTitle>

          <DialogContent>
            <Text>
              {dialogState.message}
            </Text>
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={onClose}
              >
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}