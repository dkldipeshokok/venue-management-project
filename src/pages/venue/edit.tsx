import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type VenueValues, venueSchema } from "@/schemas/venue.";
import { DynamicForm } from "@/components/FormComponent/Form";
import venueFields from "@/components/fields/venue";

function UpdateVenue() {
    const { id } = useParams();
    const nav = useNavigate();
    const [V, setV] = useState<VenueValues | null>(null);

    useEffect(() => {
        const storedVenues = localStorage.getItem("venues");

        if (!storedVenues || id === undefined) {
            return;
        }

        const venues: VenueValues[] = JSON.parse(storedVenues);

        for (const i of venues) {
            if (String(i.id) === id) {
                setV(i);
                return;
            }
        }

        toast.error("Venue not found!");
    }, [id]);

    function OnSubmit(data: VenueValues) {
        const storedVenues = localStorage.getItem("venues");

        if (!storedVenues || id === undefined) {
            toast.error("Venue not found!");
            return;
        }

        const venues: VenueValues[] = JSON.parse(storedVenues);
        const venueId = venues.findIndex((i) => String(i.id) === id);

        if (venueId === -1) {
            toast.error("Venue not found!");
            return;
        }

        venues[venueId] = { ...data, id: venues[venueId].id };

        localStorage.setItem("venues", JSON.stringify(venues));

        toast.success("Venue updated successfully!");

        setTimeout(() => {
            nav("/venue");
        }, 900);
    }

    if (!V) {
        return (
            <div className="w-full p-6">
                <p>Loading venue...</p>
            </div>
        );
    }

    return (
        <DynamicForm<VenueValues>
            fields={venueFields}
            schema={venueSchema}
            defaultValues={V}
            onSubmit={OnSubmit}
            onCancel={() => nav("/venue")}
            featureName="Venue"
            formDescription="Update venue details"
            mode="update"
            submitButtonText="Update Venue"
            cancelButtonText="Cancel"
        />
    );
}

export default UpdateVenue;