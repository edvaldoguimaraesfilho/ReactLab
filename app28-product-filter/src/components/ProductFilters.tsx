import {
  Dropdown,
  Input,
  Option,
} from "@fluentui/react-components";

interface ProductFiltersProps {
  searchText: string;
  selectedCategory: string;

  onSearchTextChange: (
    value: string
  ) => void;

  onCategoryChange: (
    value: string
  ) => void;
}

export function ProductFilters({
  searchText,
  selectedCategory,
  onSearchTextChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginTop: "24px",
        flexWrap: "wrap",
      }}
    >
      <Input
        placeholder="Search product..."
        value={searchText}
        onChange={(event) =>
          onSearchTextChange(
            event.target.value
          )
        }
      />

      <Dropdown
        value={selectedCategory}
        placeholder="Select category"
        selectedOptions={[selectedCategory]}
        onOptionSelect={(_, data) =>
          onCategoryChange(
            data.optionValue || ""
          )
        }
      >
        <Option value="">All</Option>

        <Option value="Hardware">
          Hardware
        </Option>

        <Option value="Accessories">
          Accessories
        </Option>

        <Option value="Services">
          Services
        </Option>
      </Dropdown>
    </div>
  );
}