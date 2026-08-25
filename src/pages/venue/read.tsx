import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { VenueValues } from "@/schemas/venue.";

function VenueView() {
  const nav = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [Image, setImage] = useState(false);

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
    <div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-4"
          onClick={() => nav("/venue")}
        >
          Back
        </button>
      </div>
    <div className="flex flex-col items-center justify-center p-4 space-y-7">
          <h1 className="text-2xl font-bold">Venue Details</h1>

    <div>
          <img className="w-100 h-auto object-cover hover:cursor-pointer rounded-md items-center justify-center"  src={V.image} onClick={() => {setImage(true)}}/>
    </div>
  
    <div className="bg-gray-300 text-black rounded-md px-4 py-4 items-center justify-center">
          {V.id}
    </div>

    <div className="space-x-6 text-black flex flex-col md:flex-row items-center justify-center">
          <div className="font-semibold px-2 py-2 bg-gray-200 rounded-md">{V.name}</div>
          <div className="font-semibold px-2 py-2 bg-gray-200 rounded-md">{V.type}</div>
          <div className="font-semibold px-2 py-2 bg-gray-200 rounded-md">{V.address}</div>
    </div>

    <div className="space-x-6 text-black flex flex-col md:flex-row items-center justify-center">
          <div className=" px-2 py-2 bg-gray-200 rounded-md">Capacity: {V.capacity}</div>
          <div className=" px-2 py-2 bg-gray-200 rounded-md">Price: {V.price}</div>
          <div className=" px-2 py-2 bg-gray-200 rounded-md">Status: {V.status}</div>
    </div>

    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 border-t border-gray-300 text-justify bg-gray-300 text-black rounded-md">
          <p className="text-justify px-4 py-4"> {V.description} </p>
    </div>
      {Image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setImage(false)}>  
          <img  src={V.image}  alt={V.name} className="w-full h-full object-contain" />
      

          <button
            className="absolute top-5 right-5 text-3xl text-white"
            onClick={() => setImage(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default VenueView;