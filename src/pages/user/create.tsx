import { DynamicForm } from "@/components/FormComponent/Form";
import { userSchema, type UserValues } from "@/schemas/user";
import userFields from "@/components/fields/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateUser() {
    const nav = useNavigate();

    function OnSubmit(data: UserValues) {
        const StoredData = localStorage.getItem("users");
        const users: UserValues[] = StoredData ? JSON.parse(StoredData) : [];

        const newID = users.reduce((highest, user) => {
            const match = String(user.id ?? "").match(/^USR(\d+)$/);
            const numericId = match ? Number(match[1]) : Number(user.id) || 0;
            return Math.max(highest, numericId);
        }, 0);

        const newId = `USR${String(newID + 1).padStart(6, "0")}`;
        const { Cpassword, ...userData } = data;

        const newUser = { ...userData, id: newId, createdAt: new Date().toISOString(),};

        const updatedUsers = [...users, newUser];
        
        localStorage.setItem(  "users",  JSON.stringify(updatedUsers) );

        toast.success("User saved successfully!");

        setTimeout(() => {
            nav("/user");
        }, 900);
    }

    return (
        <DynamicForm<UserValues>
            fields={userFields}
            schema={userSchema}
            defaultValues={{
                name: "",
                email: "",
                phone: "",
                role: "Employee",
                password: "",
                Cpassword: "",
                status: "Active",
            }}
            onSubmit={OnSubmit}
            onCancel={() => nav("/user")}
            featureName="User"
            formDescription="Enter User Details"
            mode="create"
            submitButtonText="Save User"
            cancelButtonText="Cancel"
        />
    );
}

export default CreateUser;