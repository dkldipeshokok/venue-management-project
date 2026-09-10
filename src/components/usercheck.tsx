import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function UserCheck() {
    const u=localStorage.getItem("CurrentUser");
    const nav = useNavigate();
    useEffect(() => {
        if (!u) {
            
            toast.error("Please login first!!");

            setTimeout(() => {
                nav("/");
            }, 2000);
        }
    }, [u, nav]);

    return( null );
}
export default UserCheck;