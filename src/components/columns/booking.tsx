import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import {type BookingData } from "@/types/types";
import { Eye, SquarePen, Trash2, Printer, ExternalLink  } from "lucide-react";

const StatusList: Record<string,string> = {
    Pending   : "bg-amber-100 text-amber-800 border-amber-200",
    Confirmed : "bg-green-100 text-green-800 border-green-200",
    Completed : "bg-emerald-100 text-emerald-800 border-emerald-200",
    Cancelled : "bg-gray-100 text-gray-800 border-gray-200",
};

const bookingCol = () : ColumnDef<BookingData>[] => [
    {
        accessorKey : "id",
        header : "Booking"
    },
    {
        accessorKey : "customer",
        header : "Customer"
    },
    {
        accessorKey : "bookby",
        header : "Booked By"
    },
    {
        accessorKey : "venue",
        header : "Venue"
    },
    {
        accessorKey : "type",
        header : "Event Type"
    },
    {
        accessorKey : "package",
        header : "Menu Packages"
    },
    {
        accessorKey : "bookfrom",
        header : "Booked From"
    },
    {
        accessorKey : "bookto",
        header : "Booked To"
    },
    {
        accessorKey : "guest",
        header : "Guests"
    },
    {
        accessorKey : "price",
        header : "Base price"
    },
    {
        accessorKey : "food",
        header : "Food Package Amount"
    },
    {
        accessorKey : "discount",
        header : "Discount"
    },
    {
        accessorKey : "total",
        header : "Total"
    },
    {
        accessorKey : "advance",
        header : "Advance"
    },
    {
        accessorKey : "due",
        header : "Due"
    },
    {
        accessorKey : "status",
        header : "Status",
        cell : ({row}) => {
            const status = row.getValue("status") as string;
            return(
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                    StatusList[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                        {status}
                </span>
            )
        }

    },
    {
        accessorKey : "action",
        header : "Actions",
        cell : ({row}) => {
            const id = row.original.id;
            return(
                 <div className="flex space-x-2">
                    <Link to={`/booking/read/${id}`} className="bg-blue-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer">  <Eye /> </Link>
                    <Link to={`/booking/update/${id}`} className="bg-orange-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer">  <SquarePen /> </Link>
                    <button className="bg-green-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"> <ExternalLink /> </button>
                    <button className="bg-purple-500 text-white px-2 py-2 rounded-md hover:scale-110 cursor-pointer"> <Printer /> </button>
                    <button className="bg-red-500 px-2 py-2 text-white hover:scale-110 cursor-pointer rounded-md" 
                        onClick={() => {
                            const ask = window.confirm("Are you sure you want to delete this venue?");
                        if(ask){
                            //DeleteVenue(id)
                        }
                    }
                }>
                <Trash2 />
                    </button>
                 </div>
            )
        }
    },

]
export default bookingCol;