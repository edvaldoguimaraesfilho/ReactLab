import { Title2, Text } from "@fluentui/react-components";

import { products } from "../data/products";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  return (
    <section className="product-section">
      <div className="section-header">
        <Title2>Lista de Produtos</Title2>
        <Text>
          Renderização declarativa usando array, map() e key.
        </Text>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}