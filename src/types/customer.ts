export type Customer = {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
};