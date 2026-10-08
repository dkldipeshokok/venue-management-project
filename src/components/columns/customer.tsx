import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types/types";
import {Link} from "react-router-dom";
import { Eye, SquarePen, Trash2 } from "lucide-react";

const Customercolumns = (DeleteUser: (id: string) => void) : ColumnDef<Customer>[] => [
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
                    <Link to={`/customer/read/${id}`}  className="bg-blue-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"> <Eye /> </Link>
                    <Link to={`/customer/update/${id}`} className="bg-orange-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"> <SquarePen /> </Link>
                    <button onClick={() => {
                            const ask = window.confirm("Are you sure you want to delete this customer?");
                            if(ask){
                                 DeleteUser(id)
                            }
                        }} className="bg-red-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"
                    >
                    <Trash2 />
                    </button>
                </div>
            )
        }
    },
]
export default Customercolumns;