import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { useState } from "react";

import { ProductFilters } from "./components/ProductFilters";
import { ProductGrid } from "./components/ProductGrid";

import { products } from "./data/products";

function App() {
  const [searchText, setSearchText] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const filteredProducts =
    products.filter((product) => {
      const matchesText =
        product.name
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === ""
          ? true
          : product.category ===
            selectedCategory;

      return (
        matchesText &&
        matchesCategory
      );
    });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Product Filter
        </Title1>

        <Text>
          Enterprise product filtering
          interface using React and
          Fluent UI.
        </Text>

        <ProductFilters
          searchText={searchText}
          selectedCategory={
            selectedCategory
          }
          onSearchTextChange={
            setSearchText
          }
          onCategoryChange={
            setSelectedCategory
          }
        />

        <ProductGrid
          products={filteredProducts}
        />
      </section>
    </main>
  );
}

export default App;