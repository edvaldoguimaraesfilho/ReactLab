import  {
  createContext,
  useContext,
  useState,
 
} from "react";

import type {ReactNode} from "react";

import type { User } from "../models/User";
import { UserService } from "../services/UserService";

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<
    React.SetStateAction<User[]>
  >;
}

const UserContext =
  createContext<UserContextType | null>(null);

export function UserProvider(
  { children }: { children: ReactNode }
) {
  const [users, setUsers] =
    useState(UserService.getAll());

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUsers must be inside UserProvider"
    );
  }

  return context;
}