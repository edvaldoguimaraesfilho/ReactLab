import {
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({
  message,
}: ErrorMessageProps) {
  return (
    <MessageBar intent="error">
      <MessageBarBody>
        {message}
      </MessageBarBody>
    </MessageBar>
  );
}