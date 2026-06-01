import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import type { Product } from "../models/Product";

interface FavoritesContextType {
  favorites: Product[];

  addFavorite: (product: Product) => void;

  removeFavorite: (id: number) => void;
}

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] =
    useState<Product[]>([]);

  function addFavorite(product: Product) {
    const exists =
      favorites.some(
        (item) => item.id === product.id
      );

    if (!exists) {
      setFavorites([...favorites, product]);
    }
  }

  function removeFavorite(id: number) {
    setFavorites(
      favorites.filter(
        (item) => item.id !== id
      )
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}