Perfeito. Abaixo está o **App 46 refeito do zero**, já com a correção do `compare` no `DataGrid`.

# App 46 — DataGrid Catalog

## 1. Create the project

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app46-datagrid-catalog -- --template react-ts

cd app46-datagrid-catalog

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

## 2. Create folders and files

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\Product.ts -ItemType File
New-Item src\data\products.ts -ItemType File
New-Item src\components\ProductDataGrid.tsx -ItemType File
New-Item artigo.md -ItemType File
```

## 3. `src\models\Product.ts`

```ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
}
```

## 4. `src\data\products.ts`

```ts
import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Surface Laptop",
    category: "Hardware",
    price: 2200,
    stock: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Microsoft Teams License",
    category: "Software",
    price: 35,
    stock: 240,
    status: "Active",
  },
  {
    id: 3,
    name: "Azure Subscription",
    category: "Cloud",
    price: 500,
    stock: 40,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Power BI Pro",
    category: "Analytics",
    price: 18,
    stock: 180,
    status: "Active",
  },
  {
    id: 5,
    name: "SharePoint Storage Package",
    category: "Cloud",
    price: 120,
    stock: 75,
    status: "Active",
  },
];
```

## 5. `src\components\ProductDataGrid.tsx`

```tsx
import {
  Badge,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  Title2,
} from "@fluentui/react-components";

import type { TableColumnDefinition } from "@fluentui/react-components";

import { products } from "../data/products";
import type { Product } from "../models/Product";

const columns: TableColumnDefinition<Product>[] = [
  {
    columnId: "name",
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => "Product",
    renderCell: (item) => (
      <TableCellLayout>
        {item.name}
      </TableCellLayout>
    ),
  },
  {
    columnId: "category",
    compare: (a, b) => a.category.localeCompare(b.category),
    renderHeaderCell: () => "Category",
    renderCell: (item) => item.category,
  },
  {
    columnId: "price",
    compare: (a, b) => a.price - b.price,
    renderHeaderCell: () => "Price",
    renderCell: (item) => `$ ${item.price}`,
  },
  {
    columnId: "stock",
    compare: (a, b) => a.stock - b.stock,
    renderHeaderCell: () => "Stock",
    renderCell: (item) => item.stock,
  },
  {
    columnId: "status",
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge appearance={item.status === "Active" ? "filled" : "outline"}>
        {item.status}
      </Badge>
    ),
  },
];

export function ProductDataGrid() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Title2>Enterprise Product Catalog</Title2>

      <DataGrid items={products} columns={columns} sortable>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>
                {renderHeaderCell()}
              </DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<Product>>
          {({ item, rowId }) => (
            <DataGridRow<Product> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>
                  {renderCell(item)}
                </DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </section>
  );
}
```

## 6. `src\App.tsx`

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { ProductDataGrid } from "./components/ProductDataGrid";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "48px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "12px",
          }}
        >
          <ProductDataGrid />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;
```

## 7. `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 8. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## 9. Run and validate

```powershell
npm run build
npm run dev
```

## Where we are

| Block   | App | Name                  | Status    |
| ------- | --: | --------------------- | --------- |
| Block 3 |  41 | Microsoft Style Login | Completed |
| Block 3 |  42 | Corporate Form        | Completed |
| Block 3 |  43 | Tabs Navigation       | Completed |
| Block 3 |  44 | Dialog Manager        | Completed |
| Block 3 |  45 | Executive Dashboard   | Completed |
| Block 3 |  46 | DataGrid Catalog      | Current   |
| Block 3 |  47 | Enterprise User List  | Next      |
