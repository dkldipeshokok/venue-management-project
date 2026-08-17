import Customercolumns from "@/components/columns/customer";
import { DataTables } from "@/components/TableComponent/Table";
import {type  CustomerValues } from "@/schemas/customer";
import { useState, useEffect } from "react";
import {PageHeader} from "@/components/common/PageHeader";


function Customers(){
    const [customer, setcustomer] = useState<CustomerValues[]>([]);
    useEffect(() =>{
        const storedCustomers = localStorage.getItem("customers");
        if (storedCustomers) {
           setcustomer(JSON.parse(storedCustomers));
        }
    },[]);
    return(
        <div className="w-full p-6">
            <PageHeader title="Customers"
                description="Manage your customers"
                createPath="/customer/create"
                createLabel="Add Customer"
            >

            </PageHeader>
                <DataTables columns={Customercolumns} data = {customer} />
            </div>
       
        )
}
export default Customers;