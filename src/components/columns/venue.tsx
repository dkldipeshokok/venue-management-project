import type { ColumnDef } from "@tanstack/react-table";
import type {VenueData} from "@/types/types";
import {Link} from "react-router-dom";
import { Eye, SquarePen, Trash2 } from "lucide-react";


const venueCol = (DeleteVenue: (id: string) => void): ColumnDef<VenueData>[] => [
    {
        accessorKey: "id",
        header: "Code"
    },
    {
        accessorKey: "name",
        header: "Name"  
    },
    {
        accessorKey: "type",
        header: "Type"
    },
    {
        accessorKey: "capacity",
        header: "Capacity"
    },
    {
        accessorKey: "price",
        header: "Price"
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
                    <Link to={`/venue/read/${id}`} className="bg-blue-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"><Eye /> </Link>
                    <Link to={`/venue/update/${id}`} className="bg-orange-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"><SquarePen /> </Link>
                    <button className="bg-red-500 px-2 py-2 text-white hover:scale-110 cursor-pointer rounded-md" 
                        onClick={() => {
                            const ask = window.confirm("Are you sure you want to delete this venue?");
                        if(ask){
                            DeleteVenue(id)
                        }
                    }
                }>
                <Trash2 />
                    </button>
                </div>
            );
        }
    }          
]
export default venueCol;