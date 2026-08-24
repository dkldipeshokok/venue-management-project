import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { VenueValues } from "@/schemas/venue.";

function VenueView() {
  const { id } = useParams<{ id: string }>();

  const [V, setV] = useState<VenueValues | null>(null);

  useEffect(() => {
    if (!id) return;

    const storedData = localStorage.getItem("venues");

    if (storedData) {
      const venues: VenueValues[] = JSON.parse(storedData);
      const foundVenue = venues.find(  (item) => String(item.id) === id    );
      setV(foundVenue || null);
    }
  }, [id]);

  if (!V) {
    return <p>Venue not found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-5">
          <h1>Venue Details</h1>

    <div>
          <img  src={`/${V.image}`} />
    </div>
  
    <div>
          {V.id}
    </div>

    <div>
          {V.name}
    </div>

    <div>
          Type: {V.type}
    </div>

    <div>
          Capacity: {V.capacity}
    </div>

    <div>
          Price: {V.price}
    </div>

    <div> 
          Status: {V.status}
    </div>
    <div>
          Address: {V.address}
    </div>

    <div className="mx-80 border-t border-gray-300 text-justify bg-gray-300 text-black rounded-md">
          <p className="text-justify px-4 py-4"> {V.description} </p>
    </div>
    
    </div>
  );
}

export default VenueView;