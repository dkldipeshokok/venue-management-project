import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import bookingFields from "@/components/fields/booking";
import type {BookingData, User, VenueData, Customer } from "@/types/types";

function CreateBooking(){
const nav = useNavigate();

const [C,setC]= useState<Customer[]>([]);

useEffect(() => {
    const storedC = localStorage.getItem("customer");
    const storedU = localStorage.getItem("user");
    const storedV = localStorage.getItem("venue");

    if (storedC){
        setC
    }
}, []);



    return(
        <div>
            Booking Page
        </div>
    )
}
export default CreateBooking;