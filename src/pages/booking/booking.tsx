import PageHeader from "@/components/common/PageHeader";
import { DataTables } from "@/components/TableComponent/Table";
import bookingCol from "@/components/columns/booking";

function Booking(){
    return(
        <div className="w-full p-6">
            <PageHeader 
                title="Bookings"
                description="Manage venue Bookings"
                createPath="/booking/create"
                createLabel=" + New Booking "
            />
            <DataTables columns={bookingCol()} data = {} />
        </div>
    )
}
export default Booking;