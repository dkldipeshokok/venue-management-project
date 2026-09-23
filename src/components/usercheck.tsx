import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

function UserCheck() {
    const u = localStorage.getItem("CurrentUser");

    if (!u) {
        toast.error("Please login first!!");
        return <Navigate to="/" replace />;
    }

    return (
        <Outlet />
    );
}

export default UserCheck;