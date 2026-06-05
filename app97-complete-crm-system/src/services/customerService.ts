import type { Customer } from "../models/Customer";

export const customers: Customer[] = [
  {
    id: 1,
    company: "Contoso Ltd",
    contact: "John Smith",
    email: "john@contoso.com",
    status: "Customer",
    annualRevenue: 125000,
  },
  {
    id: 2,
    company: "Northwind Traders",
    contact: "Sarah Johnson",
    email: "sarah@northwind.com",
    status: "Prospect",
    annualRevenue: 65000,
  },
  {
    id: 3,
    company: "Adventure Works",
    contact: "David Brown",
    email: "david@adventureworks.com",
    status: "Lead",
    annualRevenue: 25000,
  },
];