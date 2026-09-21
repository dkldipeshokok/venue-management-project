import type {ColumnDef} from "@tanstack/react-table";
import type {SubCategoryData} from "@/types/types";
import {Link} from "react-router-dom";
import {SquarePen, Trash2} from "lucide-react";

const subcategoryCol = (DeleteSubCategory: (id: string) => void): ColumnDef<SubCategoryData>[] => [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "category",
        header: "Category"
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
                    <Link to={`/menu/subcategories/update/${id}`} className="bg-orange-500 text-white hover:scale-110 cursor-pointer px-2 py-2 rounded-md"><SquarePen /> </Link>
                    <button className="bg-red-500 px-2 py-2 text-white hover:scale-110 cursor-pointer rounded-md" 
                        onClick={() => {
                            const ask = window.confirm("Are you sure you want to delete this subcategory?");
                        if(ask){
                            DeleteSubCategory(id)
                        }
                    }
                        }> <Trash2 /> </button>
                </div>
            );
        }
    }
]
export default subcategoryCol;