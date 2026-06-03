import type { User } from "../models/User";

export class UserService {
  static async getUsers(): Promise<User[]> {
    return Promise.resolve([
      {
        id: 1,
        name: "John Smith",
        role: "Administrator",
      },
      {
        id: 2,
        name: "Mary Johnson",
        role: "Manager",
      },
      {
        id: 3,
        name: "David Brown",
        role: "Analyst",
      },
    ]);
  }
}