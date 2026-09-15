import { DataTables } from "@/components/TableComponent/Table";
import bookingCol from "@/components/columns/booking";
import PageHeader from "@/components/common/PageHeader";
import { type BookingData } from "@/types/types";
import {useEffect, useState} from "react";

function Booking(){

    const [B, setB] = useState<BookingData[]> ([]);

    useEffect (() => {
        const storedData = localStorage.getItem("bookings");
        if(storedData){
            setB(JSON.parse(storedData));
        }
    },[] );


    return(
        <div className="w-full p-6">
            <PageHeader title="Bookings"
                description="Manage venue Bookings"
                createPath="/booking/create"
                createLabel=" New Booking "
            />

            <DataTables columns={bookingCol()} data = {B} />
        </div>
    )
}
export default Booking;