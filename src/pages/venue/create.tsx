import {DynamicForm} from "@/components/FormComponent/Form";
import { venueSchema, type VenueValues } from "@/schemas/venue.";
import VennueFields from "@/components/fields/venue";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


function CreateVenue(){
    const navigate = useNavigate();

    function OnSubmit(data: VenueValues){
        console.log("Venue Data:", data);
        const storedVenues = localStorage.getItem("venues");
        const venues: VenueValues[] = storedVenues ? JSON.parse(storedVenues) : [];

        const newID = venues.reduce((highest, venue) => {
            const match = String(venue.id ?? "").match(/^VEN(\d+)$/);
            const numericId = match ? Number(match[1]) : Number(venue.id) || 0;
            return Math.max(highest, numericId);
        }, 0);
        const newId = `VEN${String(newID + 1).padStart(6, "0")}`;
        const newVenue: VenueValues = { ...data, id: newId };
        
        const updatedvenues = [...venues,newVenue];
        localStorage.setItem("venues", JSON.stringify(updatedvenues));

        toast.success("Venue saved successfully!");
        setTimeout(()=>{
            navigate("/venue");
        },900);
    }

    return(
        <DynamicForm<VenueValues>
            fields={VennueFields}
            schema={venueSchema}
            defaultValues={{
                name: "",
                image: "",               
                status: "Active"
            }}
            onSubmit={OnSubmit}
            onCancel={() => navigate("/venue")}
            featureName="Venue"
            formDescription="Enter Venue Details"
            mode="create"
            submitButtonText="Save Venue"
            cancelButtonText="Cancel"
        />
        
        
    )
}
export default CreateVenue;