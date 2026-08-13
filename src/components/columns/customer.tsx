import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types/customer";

const Customercolumns: ColumnDef<Customer>[] = [
    {
        accessorKey : "id",
        header : "Customer ID"
    },
    {
        accessorKey : "name",
        header : "Name"
    },
    {
        accessorKey : "organization",
        header : "Organization"
    },
    {
        accessorKey : "phone",
        header : "Phone"
    },
    {
        accessorKey : "email",
        header : "Email"
    },
    {
        accessorKey : "status",
        header : "Status"
    },
    {
        accessorKey : "action",
        header : "Action",
        cell : ({row}) => {
            return(
                <div className="flex gap-2">
                    <button className="text-blue-600">View</button>
                    <button className="text-yellow-600">Edit</button>
                    <button className="text-red-600">Delete</button>
                </div>
            )
        }
    },
]
export default Customercolumns;