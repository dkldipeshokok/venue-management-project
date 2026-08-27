import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type UserValues, userSchema } from "@/schemas/user";
import { DynamicForm } from "@/components/FormComponent/Form";
import userFields from "@/components/fields/user";
import Loading from "@/components/common/Loading";

type StoredUser = Omit<UserValues, "Cpassword">;

function UpdateUser() {
    const { id } = useParams();
    const nav = useNavigate();

    const [U, setU] = useState<UserValues | null>(null);
    const [Load, setLoad] = useState(true);

    useEffect(() => {
        const StoredData = localStorage.getItem("users");

        if (!StoredData || id === undefined) {
            toast.error("User not found!");
            setTimeout(() => {
                nav("/user");
            }, 2900);
            setLoad(false);
            return;
        }

        const users: StoredUser[] = JSON.parse(StoredData);

        for (const i of users) {
            if (String(i.id) === id) {
                setU({ ...i,  Cpassword: i.password,   });
                setLoad(false);
                return;
            }
        }

        toast.error("User not found!");

        setTimeout(() => {
            nav("/user");
        }, 2900);

        setLoad(false);
    }, [id, nav]);

    function OnSubmit(data: UserValues) {
        const StoredData = localStorage.getItem("users");

        if (!StoredData || id === undefined) {
            toast.error("User not found!");

            setTimeout(() => {
                nav("/user");
            }, 2900);

            return;
        }

        const users: StoredUser[] = JSON.parse(StoredData);

        const UID = users.findIndex( (i) => String(i.id) === id  );

        if (UID === -1) {
            toast.error("User not found!");

            setTimeout(() => {
                nav("/user");
            }, 2900);

            return;
        }

        const { Cpassword, ...userData } = data;

        users[UID] = {...userData, id: users[UID].id, };

        localStorage.setItem( "users", JSON.stringify(users) );

        toast.success("User updated successfully!");

        setTimeout(() => {
            nav("/user");
        }, 900);
    }

    if (Load) {
        return (
            <div className="w-full p-6 flex items-center justify-center">
                <Loading className="h-10 w-10" />
            </div>
        );
    }

    if (!U) {
        return (
            <div className="w-full p-6 text-center">
                <p>User not found!!!</p>
                <p>Redirecting to user list...</p>
            </div>
        );
    }

    return (
        <DynamicForm<UserValues>
            fields={userFields}
            schema={userSchema}
            defaultValues={U}
            onSubmit={OnSubmit}
            onCancel={() => nav("/user")}
            featureName="User"
            formDescription="Update user details"
            mode="update"
            submitButtonText="Update User"
            cancelButtonText="Cancel"
        />
    );
}

export default UpdateUser;