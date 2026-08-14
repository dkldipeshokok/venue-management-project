import { Link } from "react-router-dom";
import Customercolumns from "@/components/columns/customer";
import { DataTables } from "@/components/TableComponent/Table";
import {type  CustomerFormValues } from "@/schemas/customer";
import { useState, useEffect } from "react";


function Customers(){
    const [customer, setcustomer] = useState<CustomerFormValues[]>([]);
    useEffect(() =>{
        const storedCustomers = localStorage.getItem("customers");
        if (storedCustomers) {
           setcustomer(JSON.parse(storedCustomers));
        }
    },[]);
    return(
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Customers</h1>
                    <p className="text-muted-foreground">Manage your customers</p>
                </div>
                    <Link to="/create" className="rounded-md bg-primary px-4 py-2 text-primary-foreground"> + Add Customer</Link>
                </div>
                <input type="text" placeholder="Search Customers" className="mb-4 rounded-md border px-4 py-2" />
            <div>
                <DataTables columns={Customercolumns} data = {customer} />
            </div>
        </div>
        )
}
export default Customers;