import { DataTables } from "@/components/TableComponent/Table";
import venueCol from "@/components/columns/venue";
import PageHeader from "@/components/common/PageHeader";
import { type VenueValues } from "@/schemas/venue.";
import {useEffect, useState} from "react";
import {toast} from "sonner"

function Venue(){

    const [V, setV] = useState<VenueValues[]> ([]);
    useEffect (() => {
        const storedData = localStorage.getItem("Venues");
        if(storedData){
            setV(JSON.parse(storedData));
        }
    },[] );

    const DeleteVenue = (id : string) => {
        const updatedVenue = V.filter(
             (item) => String(item.id) !== id
        );
        localStorage.setItem("Venues",JSON.stringify(updatedVenue));
        setV(updatedVenue);
        toast.success("Venue Deleted Successfully");
    }


    return(
        <div className="w-full p-6">
            <PageHeader title="Venue Management"
                description="Manage your venues"
                createPath="/venue/create"
                createLabel="Add Venue"
            />
            
            <DataTables columns={venueCol()} data = {[Venue]} />
        </div>
    )
}
export default Venue;