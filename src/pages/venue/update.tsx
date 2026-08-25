import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type VenueValues, venueSchema } from "@/schemas/venue.";
import { DynamicForm } from "@/components/FormComponent/Form";
import venueFields from "@/components/fields/venue";
import Loading from "@/components/common/Loading";


function UpdateVenue() {
    const { id } = useParams();
    const nav = useNavigate();
    const [V, setV] = useState<VenueValues | null>(null);
    const [Load, setLoad] = useState(true);

    useEffect(() => {
        const storedVenues = localStorage.getItem("venues");

        if (!storedVenues || id === undefined) {
            toast.error("Venue not found!");
            setTimeout(() => {
                nav("/venue");
            }, 2900);
            setLoad(false);
            return;
        }

        const venues: VenueValues[] = JSON.parse(storedVenues);

        for (const i of venues) {
            if (String(i.id) === id) {
                setV(i);
                setLoad(false);
                return;
            }
        }
        if(V){
            setV(V);
            setLoad(false);
            return;
        }

        toast.error("Venue not found!");
        setTimeout(() => {
            nav("/venue");
        }, 2900);
        setLoad(false);
    }, [id]);

    function OnSubmit(data: VenueValues) {
        const storedVenues = localStorage.getItem("venues");

        if (!storedVenues || id === undefined) {
            toast.error("Venue not found!");
          
            setTimeout(() => {
                nav("/venue");
            }, 2900);
            return;
        }

        const venues: VenueValues[] = JSON.parse(storedVenues);
        const venueId = venues.findIndex((i) => String(i.id) === id);

        if (venueId === -1) {
            toast.error("Venue not found!");
            setTimeout(() => {
                nav("/venue");
            }, 2900);
            return;
        }

        venues[venueId] = { ...data, id: venues[venueId].id };

        localStorage.setItem("venues", JSON.stringify(venues));

        toast.success("Venue updated successfully!");

        setTimeout(() => {
            nav("/venue");
        }, 900);
    }

        if(Load){
        return (
            <div className="w-full p-6 flex items-center justify-center">
                <Loading className="h-10 w-10" />
            </div>
        );
        }


        if (!V) {
        return (
            <div className="w-full p-6 text-center">
                <p>Venue not found!!!</p>
                <p>Redirecting to venue list...</p>
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