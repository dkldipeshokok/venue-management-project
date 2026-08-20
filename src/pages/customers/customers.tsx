import Customercolumns from "@/components/columns/customer";
import { DataTables } from "@/components/TableComponent/Table";
import {type  CustomerValues } from "@/schemas/customer";
import { useState, useEffect } from "react";
import {PageHeader} from "@/components/common/PageHeader";
import { toast } from "sonner";

function Customers(){
    const [customer, setcustomer] = useState<CustomerValues[]>([]);
    useEffect(() =>{
        const storedData = localStorage.getItem("customers");
        if (storedData) {
           setcustomer(JSON.parse(storedData));
        }
    },[]);

    const DeleteUser = (id: string) => {
        const updatedCustomers = customer.filter(
            (item) => String(item.id) !== id
        );

    localStorage.setItem("customers",JSON.stringify(updatedCustomers));
        setcustomer(updatedCustomers);
        toast.success("Customer Deleted successfully!");
    };
    
    return(
        <div className="w-full p-6">
            <PageHeader title="Customers"
                description="Manage your customers"
                createPath="/customer/create"
                createLabel="Add Customer"
            >

            </PageHeader>
                <DataTables columns={Customercolumns(DeleteUser)} data = {customer} />
            </div>
       
        )
}
export default Customers;