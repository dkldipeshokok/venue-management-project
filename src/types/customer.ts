export type Customer = {
  id: number;
  name: string;
  organization: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
};