import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import type { User } from "../models/User";

interface UserContextType {
  user: User;
  updateUser: (user: User) => void;
}

const UserContext =
  createContext<UserContextType | undefined>(
    undefined
  );

const initialUser: User = {
  id: 1,
  name: "John Smith",
  role: "Administrator",
  department: "IT",
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({
  children,
}: UserProviderProps) {
  const [user, setUser] =
    useState<User>(initialUser);

  function updateUser(newUser: User) {
    setUser(newUser);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context =
    useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
}