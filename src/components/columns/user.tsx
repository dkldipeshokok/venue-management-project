import type { ColumnDef } from "@tanstack/react-table";
import {type User} from "@/types/types"
import { Link } from "react-router-dom";
import {SquarePen, Trash2 } from "lucide-react";

const Usercolumns = (DeleteUser: (id: string) => void): ColumnDef<User>[] => [
    {
        accessorKey: "id",
        header: "Employee Code",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");

            return (
                <span
                    className={`px-2 py-1 rounded-md text-white ${
                        status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                >
                    {status === "Active" ? "Active" : "Inactive"}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created",
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const id = row.original.id;

            return (
                <div className="flex gap-3">
                    <Link to={`/user/update/${id}`} className="bg-orange-500 px-2 py-2 text-white hover:scale-110 cursor-pointer rounded-md" ><SquarePen /></Link>
                    <button
                        onClick={() => {
                            const ask = window.confirm("Are you sure you want to delete this user?");
                            if (ask) {
                                DeleteUser(String(id));
                            }
                        }}
                        className="bg-red-500 px-2 py-2 text-white hover:scale-110 cursor-pointer rounded-md"
                    >
                        <Trash2 />
                    </button>
                </div>
            );
        },
    },
];

export default Usercolumns;