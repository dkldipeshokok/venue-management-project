import { DynamicForm } from "@/components/FormComponent/Form";
import bookingFields from "@/components/fields/booking";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import type { BookingData, User, VenueData, Customer } from "@/types/types";
import { bookingSchema, type BookingValues } from "@/schemas/booking";
import type { packageValue } from "@/schemas/menu/package";

function UpdateBooking() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [C, setC] = useState<Customer[]>([]);
  const [V, setV] = useState<VenueData[]>([]);
  const [P, setP] = useState<packageValue[]>([]);
  const [U, setU] = useState<User | null>(null);
  const [B, setB] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedC = localStorage.getItem("customers");
    const storedV = localStorage.getItem("venues");
    const storedP = localStorage.getItem("packages");
    const storedU = localStorage.getItem("CurrentUser");
    const storedB = localStorage.getItem("bookings");

    if (storedC) setC(JSON.parse(storedC));
    if (storedV) setV(JSON.parse(storedV));
    if (storedP) setP(JSON.parse(storedP));
    if (storedU) setU(JSON.parse(storedU));

    const bookings: BookingData[] = storedB ? JSON.parse(storedB) : [];
    const selectedBooking = bookings.find(  (booking) => String(booking.id) === String(id) );

    if (selectedBooking) { 
        setB(selectedBooking);
    } 
    else {
        toast.error("Booking not found!");
        navigate("/booking");
    }

    setLoading(false);
  }, [id, navigate]);

  const customerOptions = C.map((c) => ({ value: String(c.id), label: c.name, }));

  const venueOptions = V.map((v) => ({  value: String(v.id), label: v.name, }));

  const packageOptions = P.map((pkg) => ({ value: String(pkg.id),  label: `${pkg.name} (Rs. ${pkg.price})`,}));

  function OnSubmit(data: BookingValues) {
    if (!U) {
      toast.error("Please login first!");
      return;
    }

    if (!B) {
      toast.error("Booking not found!");
      return;
    }

    const storedBookings = localStorage.getItem("bookings");
    const bookings: BookingData[] = storedBookings ? JSON.parse(storedBookings) : [];

    const subtotal = (Number(data.price) || 0) + (Number(data.food) || 0);
    const discountAmount =  (subtotal * (Number(data.discount) || 0)) / 100;
    const calculatedTotal = subtotal - discountAmount;
    const calculatedDue =  calculatedTotal - (Number(data.advance) || 0);

    const updatedBooking: BookingData = {
      ...B,
      ...data,
      id: B.id,
      bookby: B.bookby,
      total: calculatedTotal,
      due: calculatedDue,
    };

    const updatedBookings = bookings.map((booking) =>  String(booking.id) === String(B.id) ? updatedBooking : booking );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    toast.success("Booking updated successfully!");

    setTimeout(() => {
      navigate("/booking");
    }, 900);
  }

  if (loading || !B) {
    return null;
  }

  return (
    <DynamicForm<BookingValues>
      fields={bookingFields({
        customer: customerOptions,
        venue: venueOptions,
        PKG: packageOptions,
      })}
      schema={bookingSchema}
      defaultValues={{
        id: B.id,
        customer: B.customer,
        venue: B.venue,
        type: B.type,
        package: B.package,
        bookfrom: B.bookfrom,
        bookto: B.bookto,
        guest: B.guest,
        price: B.price,
        food: B.food,
        discount: B.discount,
        total: B.total,
        advance: B.advance,
        due: B.due,
        status: B.status,
      }}
      onValuesChange={(values, setValue) => {
        const selectedVenue = V.find(  (v) => String(v.id) === String(values.v) );
        const selectedPackage = P.find( (pkg) => String(pkg.id) === String(values.package) );

        const price = selectedVenue ? Number(selectedVenue.price) || 0 : 0;
        const food = selectedPackage  ? Number(selectedPackage.price) || 0 : 0;
        const discount = Number(values.discount) || 0;
        const advance = Number(values.advance) || 0;

        const subtotal = price + food;
        const discountAmount = (subtotal * discount) / 100;
        const total = subtotal - discountAmount;
        const due = total - advance;

        if (Number(values.price) !== price) setValue("price", price);
        if (Number(values.food) !== food) setValue("food", food);
        if (Number(values.total) !== total) setValue("total", total);
        if (Number(values.due) !== due) setValue("due", due);
      }}
      onSubmit={OnSubmit}
      onCancel={() => navigate("/booking")}
      featureName="Booking"
      formDescription="Update Booking Details"
      mode="update"
      submitButtonText="Update Booking"
      cancelButtonText="Cancel"
    />
  );
}

export default UpdateBooking;