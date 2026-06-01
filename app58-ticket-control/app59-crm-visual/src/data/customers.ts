import type { Customer } from "../models/Customer";

export const customers: Customer[] = [
  {
    id: 1,
    company: "Contoso Ltd",
    contact: "John Carter",
    email: "john@contoso.com",
    status: "Active",
    revenue: "$120,000",
  },
  {
    id: 2,
    company: "Northwind Group",
    contact: "Sarah Johnson",
    email: "sarah@northwind.com",
    status: "Pending",
    revenue: "$48,000",
  },
  {
    id: 3,
    company: "Fabrikam Inc",
    contact: "Michael Adams",
    email: "michael@fabrikam.com",
    status: "Inactive",
    revenue: "$12,000",
  },
];