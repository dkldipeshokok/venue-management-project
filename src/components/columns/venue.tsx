import type { ColumnDef } from "@tanstack/react-table";

const venueCol = (): ColumnDef<any>[] => [
    {
        accessorKey: "id",
        header: "Code"
    },
    
    {
        accessorKey: "image",
        header: "Image"
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
        cell: () => {
            return (
                <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                </div>
            )
        }
    }
]
export default venueCol;