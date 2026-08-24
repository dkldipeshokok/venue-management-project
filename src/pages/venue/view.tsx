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

      const foundVenue = venues.find(
        (item) => String(item.id) === id
      );

      setV(foundVenue || null);
    }
  }, [id]);

  if (!V) {
    return <p>Venue not found</p>;
  }

  return (
    <div>
    <h1>Venue Details</h1>

    <p>Image:</p><img  src={V.image} />

    <p>ID: {V.id}</p>

    <p>Name: {V.name}</p>

    <p>Type: {V.type}</p>

    <p>Capacity: {V.capacity}</p>

    <p>Price: {V.price}</p>

    <p>Status: {V.status}</p>

    <p>Description: {V.description}</p>

    <p>Address: {V.address}</p>
      
    </div>
  );
}

export default VenueView;