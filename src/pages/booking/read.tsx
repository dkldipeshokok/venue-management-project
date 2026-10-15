import { packageITMCol, type foundPKGITM } from "@/components/columns/menu/package";
import { DataTables } from "@/components/TableComponent/Table";
import type { packageValue } from "@/schemas/menu/package";
import type { BookingData, CategoryData, Customer, ItemData, SubCategoryData, VenueData } from "@/types/types";
import { ArrowLeft, CalendarDays, Clock, DollarSign, Info, User, Home, NotepadText, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function ReadBooking() {
  const nav = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [B, setB] = useState<BookingData | null>(null);
  const [C, setC] = useState<Customer[]>([]);
  const [V, setV] = useState<VenueData[]>([]);

  const [PKG, setPKG] = useState<packageValue[]>([]);
  const [foundITM, setfoundITM] = useState<foundPKGITM[]>([]);

  

  useEffect(() => {
    if (!id) {
      toast.error("NO Booking found");
      nav("/booking");
      return;
    }

    const storedB = localStorage.getItem("bookings");
    const bookings: BookingData[] = storedB ? JSON.parse(storedB) : [];

    const searchedB = bookings.find((i) => String(i.id) === String(id));
    if (!searchedB) {
      setB(null);
      setfoundITM([]);
      toast.error("Booking not found");
      return;
    }
    setB(searchedB);

    const storedC = localStorage.getItem("customers");
    if (storedC) setC(JSON.parse(storedC));

    const storedV = localStorage.getItem("venues");
    if (storedV) setV(JSON.parse(storedV));


    const storedPKG = localStorage.getItem("packages");
    const packages: packageValue[] = storedPKG ? JSON.parse(storedPKG) : [];
    setPKG(packages);

    const searchedPKG = packages.find(
      (i) => String(i.id) === String(searchedB.package)
    );

    if (searchedPKG) {
      const storedITM = localStorage.getItem("items");
      const storedCAT = localStorage.getItem("categories");
      const storedSCAT = localStorage.getItem("subcategories");

      const items: ItemData[] = storedITM ? JSON.parse(storedITM) : [];
      const categories: CategoryData[] = storedCAT ? JSON.parse(storedCAT) : [];
      const subcategories: SubCategoryData[] = storedSCAT  ? JSON.parse(storedSCAT) : [];

      const itemID = searchedPKG.menuItems || [];

      const found: foundPKGITM[] = itemID.map((itm) => {
        const item = items.find((i) => String(i.id) === String(itm));
        const category = categories.find( (c) => String(c.id) === String(item?.category));
        const subcategory = subcategories.find( (s) => String(s.id) === String(item?.sub));

        return {
          id: item?.id || String(itm),
          name: item?.name || "Unknown Item",
          categoryName: category?.name || "-",
          subCategoryName: subcategory?.name || "-",
        };
      });
      setfoundITM(found);
    } 
    else {
      setfoundITM([]);
    }

  }, [id, nav]);

  if (!B) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-500 font-medium">Booking details not found.</p>
         <button  onClick={() => nav("/booking")}  className="inline-flex items-center text-sm text-blue-600 hover:underline font-medium cursor-pointer">
          <ArrowLeft className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition cursor-pointer" /> Back to Bookings
        </button>
      </div>
    );
  }

  const customer = C.find((i) => String(i.id) === String(B.customer));
  const venue = V.find((i) => String(i.id) === String(B.venue));

  let shiftLabel = "-";
  if (B.shift === "Morning") 
    shiftLabel = "Morning (7 AM - 4 PM)";
  else if (B.shift === "Evening") 
    shiftLabel = "Evening (5:30 PM - 10:30 PM)"; 
  else if (B.shift === "Whole Day") 
    shiftLabel = "Whole Day";
  else if (B.shift) 
    shiftLabel = B.shift;

  let statusColor = "bg-gray-100 text-gray-800";
  if (B.status === "Confirmed")  
    statusColor = "bg-emerald-100 text-emerald-800";
  else if (B.status === "Cancelled") 
    statusColor = "bg-red-100 text-red-800";
  else if (B.status === "Completed") 
    statusColor = "bg-blue-100 text-blue-800";
  else if (B.status === "Pending") 
    statusColor = "bg-yellow-100 text-yellow-800";

  

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
       <button  onClick={() => nav("/booking")}  className="inline-flex items-center text-sm text-blue-600 hover:underline font-medium cursor-pointer">
          <ArrowLeft className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition cursor-pointer" /> Back to Bookings
        </button>
      </div>

      <div className="bg-card text-card-foreground border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-muted px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Booking Details</h1>
            <p className="text-xs text-muted-foreground mt-1">Code: {B.id}</p>
          </div>
          <span  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            {B.status}
          </span>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center bg-muted/50 p-4 rounded-lg border border-border">
              <User className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Customer</p>
                <p className="text-lg font-bold text-foreground mt-0.5">
                  {customer?.name || "Unknown Customer"}
                </p>
              </div>
            </div>

            <div className="flex items-center bg-muted/50 p-4 rounded-lg border border-border">
              <Home className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-semibold">Venue</p>
                <p className="text-lg font-bold text-foreground mt-0.5">
                  {venue?.name || "Unknown Venue"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground flex items-center">
              <Info className="w-4 h-4 mr-2 text-primary" /> Booking Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Event Type</p>
                <p className="text-sm font-medium mt-1">{B.type || "-"}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Booked By</p>
                <p className="text-sm font-medium mt-1">{B.bookby || "-"}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Guests</p>
                <p className="text-sm font-medium mt-1">{B.guest}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground flex items-center">
              <PackageCheck className="w-4 h-4 mr-2 text-primary" />
              Menu Package
            </h3>
            {(() => {
              const selectedPackage = PKG.find( (pkg) => String(pkg.id) === String(B.package));

              if (!selectedPackage) {
                return (
                  <p className="text-sm text-muted-foreground">
                    Package details not found.
                  </p>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">
                        Package Name
                      </p>
                      <p className="text-lg font-bold text-foreground mt-1">
                        {selectedPackage.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Code: {selectedPackage.id}
                      </p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground uppercase font-semibold">
                        Package Price
                      </p>
                      <p className="text-lg font-bold text-foreground mt-1">
                        Rs. {Number(selectedPackage.price || 0).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {foundITM.length} included items
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">
                      Description
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedPackage.description?.trim() ||
                        "No description provided for this package."}
                    </p>
                  </div>

                  <div className="border border-border rounded-lg overflow-hidden">
                    <DataTables
                      columns={packageITMCol()}
                      data={foundITM}
                      searchHide={true}
                    />
                  </div>
                </div>
              );
            })()}
          </div>



          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-primary" /> Booking Schedule
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Booked From</p>
                <p className="text-sm font-medium mt-1">{B.bookfrom || "-"}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Booked To</p>
                <p className="text-sm font-medium mt-1">{B.bookto || "-"}</p>
              </div>

              <div className="flex items-center bg-muted/50 p-4 rounded-lg border border-border md:col-span-2">
                <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Shift</p>
                  <p className="text-sm font-medium mt-1">{shiftLabel}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="text-base font-semibold text-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-primary" /> Payment Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Venue Price</p>
                <p className="text-lg font-bold mt-1">
                  Rs. {Number(B.price || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Food Package Amount</p>
                <p className="text-lg font-bold mt-1">
                  Rs. {Number(B.food || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Discount</p>
                <p className="text-sm font-medium mt-1">{B.discount}%</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Total Amount</p>
                <p className="text-lg font-bold mt-1">
                  Rs. {Number(B.total || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Advance Paid</p>
                <p className="text-lg font-bold mt-1">
                  Rs. {Number(B.advance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Due Amount</p>
                <p className="text-lg font-bold mt-1">
                  Rs. {Number(B.due || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
            <div className="border-t border-border pt-6 space-y-4">
                <h3 className="text-base font-semibold text-foreground flex items-center">
                  <NotepadText className="w-4 h-4 mr-2 text-primary" /> Description
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <p className="text-sm font-medium mt-1 whitespace-pre-wrap">
                      {B.description || "-"}
                    </p>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBooking;