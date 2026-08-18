import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types/customer";
import {Link} from "react-router-dom";
import { SquarePen, Trash2, View } from "lucide-react";

const Customercolumns = (DeleteUser: (id: number) => void) : ColumnDef<Customer>[] => [
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
        header : "Status",
        cell : ({row}) => {
            const status = row.getValue("status");
            return(
                <span className={`px-2 py-1 rounded-md text-white ${status === "Active" ? "bg-green-500 text-green-900" : "bg-red-500 text-red"}`}>
                    {status === "Active" ? "Active" : "Inactive"}
                </span>
            )
        }
    },
    {
        accessorKey : "action",
        header : "Action",
        cell : ({row}) => {
            const id = row.original.id;
            return(
                <div className="flex gap-3">
                    <Link to={`/customer/read/${id}`}  className="text-blue-500"> <View /> </Link>
                    <Link to={`/customer/update/${id}`} className="text-orange-500"> <SquarePen /> </Link>
                    <button onClick={() => {
                        const ask = window.confirm("Are you sure you want to delete this customer?");
                        if(ask){
                            DeleteUser(id)
                        }
                    }} className="text-red-500 hover:text-red-700">
                        <Trash2 />
                    </button>
                </div>
            )
        }
    },
]
export default Customercolumns;