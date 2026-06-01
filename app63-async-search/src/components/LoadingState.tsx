import {
  Spinner,
  Text,
} from "@fluentui/react-components";

export function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginTop: "24px",
      }}
    >
      <Spinner />

      <Text>Loading search results...</Text>
    </div>
  );
}