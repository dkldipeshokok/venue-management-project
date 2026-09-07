import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login (){
    const nav = useNavigate();
    return(
        <div className="flex item-center text-align-center">
            <input
                type="email"
                placeholder="Enter Email"
            />

            <input
                type="password"
                placeholder="Enter Password"
            />

            <button>
                Login
            </button>
        </div>
    )


}
export default Login;