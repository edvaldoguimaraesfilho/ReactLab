import {
  createContext,
  useContext,
  useState,
} from "react";

interface AppContextType {
  title: string;
}

const AppContext =
  createContext<AppContextType | null>(null);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title] = useState(
    "Mini Framework React Enterprise"
  );

  return (
    <AppContext.Provider value={{ title }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
}