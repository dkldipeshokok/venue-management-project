import { DataTables } from "@/components/TableComponent/Table";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import userColumns from "@/components/columns/user";
import {type UserValues } from "@/schemas/user";
import { toast } from "sonner";

function User() {
    const [U, setU] = useState<UserValues[]>([]);

    useEffect(() =>{
            const storedData = localStorage.getItem("users");
            if (storedData) {
               setU(JSON.parse(storedData));
            }
        },[]);

    const DeleteUser = (id: string) => {
        const updatedUsers = U.filter((item) => String(item.id) !== id);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setU(updatedUsers);
        toast.success("User Deleted successfully!");
    };

    return (
        <div className="w-full p-6">
            <PageHeader
                title="User Management"
                description="Manage your users"
                createPath="/user/create"
                createLabel="Add User"
            />
            <DataTables columns={userColumns(DeleteUser)} data={U} />
        </div>
    );
}

export default User;