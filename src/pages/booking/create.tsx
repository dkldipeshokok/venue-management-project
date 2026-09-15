import {DynamicForm} from "@/components/FormComponent/Form";
import bookingFields from "@/components/fields/booking";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { BookingData, User, VenueData, Customer } from "@/types/types";
import  {bookingSchema, type BookingValues} from "@/schemas/booking";

function CreateBooking(){
    const navigate = useNavigate();

    const [C, setC] = useState<Customer[]>([]);
    const [V, setV] = useState<VenueData[]>([]);
    const [U, setU] = useState<User | null>(null);

    useEffect(() => {
        const storedC = localStorage.getItem("customers");
        const storedV = localStorage.getItem("venues");
        const storedU = localStorage.getItem("CurrentUser");

        if (storedC){
            setC(JSON.parse(storedC));
        }

        if (storedV){
            setV(JSON.parse(storedV));
        }

        if (storedU){
            setU(JSON.parse(storedU));
        }
    }, []);

    const customerOptions = C.map((customer) => ({
        value: customer.id,
        label: customer.name
    }));

    const venueOptions = V.map((venue) => ({
        value: venue.id,
        label: venue.name
    }));

    function OnSubmit(data: BookingValues){
        if (!U){
            toast.error("Please login first!");
            return;
        }
        const storedBookings = localStorage.getItem("bookings");
        const bookings: BookingData[] = storedBookings ? JSON.parse(storedBookings) : [];

        const newID = bookings.reduce((highest, booking) => {
            const match = String(booking.id ?? "").match(/^BK(\d+)$/);
            const num = match ? Number(match[1]) : Number(booking.id) || 0;
            return Math.max(highest, num);
        }, 0);

        const newId = `BK${String(newID + 1).padStart(6, "0")}`;

        const newBooking: BookingData = { ...data, id: newId, bookby: U.id };

        const updatedBookings = [...bookings, newBooking];

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        toast.success("Booking saved successfully!");

        setTimeout(() => {
            navigate("/booking");
        }, 900);
    }

    return(
        <DynamicForm<BookingValues>
            fields={bookingFields({
                customer: customerOptions,
                venue: venueOptions
            })}
            schema={bookingSchema}
            defaultValues={{
                id: "",
                customer: "",
                venue: "",
                type: "",
                package: "",
                bookfrom: "",
                bookto: "",
                guest: 0,
                price: 0,
                food: 0,
                discount: 0,
                total: 0,
                advance: 0,
                due: 0,
                status: "Pending"
            }}
            onSubmit={OnSubmit}
            onCancel={() => navigate("/booking")}
            featureName="Booking"
            formDescription="Enter Booking Details"
            mode="create"
            submitButtonText="Save Booking"
            cancelButtonText="Cancel"
        />
    )
}

export default CreateBooking;