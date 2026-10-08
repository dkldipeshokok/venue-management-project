import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import {type BookingData, type Customer, type VenueData } from "@/types/types";
import { Eye, SquarePen, Trash2, Printer, ExternalLink  } from "lucide-react";
import type { packageValue } from "@/schemas/menu/package";

const StatusList: Record<string,string> = {
    Pending   : "bg-amber-100 text-amber-800 border-amber-200",
    Confirmed : "bg-green-100 text-green-800 border-green-200",
    Completed : "bg-emerald-100 text-emerald-800 border-emerald-200",
    Cancelled : "bg-gray-100 text-gray-800 border-gray-200",
};

const bookingCol = (DeleteBooking: (id: string) => void) : ColumnDef<BookingData>[] => { 

    const customers: Customer[] = JSON.parse(localStorage.getItem("customers") || "[]");
    const venues: VenueData[] = JSON.parse(localStorage.getItem("venues") || "[]");
    const packages: packageValue[] = JSON.parse(localStorage.getItem("packages") || "[]");
    
    return [
    {
      accessorKey: "id",
      header: "Booking ID",
    },
    {
        accessorKey : "customer",
        header : "Customer",
        cell: ({ row }) => {
            const id = row.getValue("customer") as string;
            const found = customers.find((c) => String(c.id) === String(id));
            return <span>{found?.name || id}</span>;
      },
    },

    {
        accessorKey : "bookby",
        header : "Booked By"
    },
    {
        accessorKey : "venue",
        header : "Venue",
        cell: ({ row }) => {
            const id = row.getValue("venue") as string;
            const found = venues.find((v) => String(v.id) === String(id));
            return <span>{found?.name || id}</span>;
      },
    },
    {
        accessorKey : "type",
        header : "Event Type"
    },
    {
        accessorKey : "package",
        header : "Menu Packages",
        cell: ({ row }) => {
            const id = row.getValue("package") as string;
            const found = packages.find((p) => String(p.id) === String(id));
            return <span>{found?.name || id || "-"}</span>;
      },
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
        header : "Total",
        cell: ({ row }) => {
            const val = Number(row.getValue("total") || 0);
            return <span>Rs. {val.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>;
      },
    },
    {
        accessorKey : "advance",
        header : "Advance"
    },
    {
        accessorKey : "due",
        header : "Due",
        cell: ({ row }) => {
            const val = Number(row.getValue("due") || 0);
            return (
            <span className={val > 0 ? "text-red-600 font-semibold" : "text-emerald-600"}>
                Rs. {val.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            );
      },
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
                            const ask = window.confirm("Are you sure you want to delete this booking?");
                        if(ask){
                            DeleteBooking(id)
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
}
export default bookingCol;