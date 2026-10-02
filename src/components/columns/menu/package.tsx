import type { PackageData } from "@/types/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import {Eye, SquarePen, Trash2} from "lucide-react";


export type foundPKGITM = {
    id: string;
    name: string;
    categoryName: string;
    subCategoryName: string;
};

export const packageITMCol = (): ColumnDef<foundPKGITM>[] => [
    {
        accessorKey: "id",
        header: "Code"
    },
    {
        accessorKey: "name",
        header: "Item Name"
    },
    {
        accessorKey: "categoryName",
        header: "Category"
    },
    {
        accessorKey: "subCategoryName",
        header: "Sub Category"
    },
];

const packageCol = (DeletePackage: (id: string) => void): ColumnDef<PackageData>[] => [
    {
        accessorKey: "id",
        header: "Code"
    },
    {
        accessorKey: "name",
        header: "Package Name"
    },
    {
        accessorKey: "price",
        header: "Package Price"
    },
    {
        accessorKey: "status",
        header: "Status",
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
        accessorKey: "action",
        header: "Action",
        cell: ({row}) => {
             const id = row.original.id;
            return (
                <div className="flex space-x-2">
                    <Link to={`/menu/packages/read/${id}`} className="bg-blue-500 text-white hover:scale-110 cursor-pointer px-2 py-2 rounded-md"><Eye /> </Link>
                    <Link to={`/menu/packages/update/${id}`} className="bg-orange-500 text-white hover:scale-110 cursor-pointer px-2 py-2 rounded-md"><SquarePen /> </Link>
                    <button className="bg-red-500 px-2 py-2 text-white hover:scale-110 cursor-pointer rounded-md" 
                        onClick={() => {
                            const ask = window.confirm("Are you sure you want to delete this package?");
                        if(ask){
                           DeletePackage(id);
                        }
                    }
                        }> <Trash2 /> </button>
                </div>
            );
        }
    }
]
export default packageCol;