import { Button } from "@fluentui/react-components";

interface Props {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PaginationBar({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        marginTop: "24px",
      }}
    >
      <Button
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </Button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}