import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import type {User} from "@/types/types"

function Login (){
    const nav = useNavigate();
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");

    function onLogin(){
        const storedData = localStorage.getItem("users");
        const users : User[] = storedData ? JSON.parse(storedData) : [];

        const u = users.find(  (i) => i.email === email && i.password === pass  );
        if(!u){
            toast.error("Invalid Email and Password");
            return;
        }
        if(u.status !== "Active"){
            toast.error("This user is inactive");
            return;
        }
        localStorage.setItem("CurrentUser",JSON.stringify(u));
        toast.success(`Welcome user ${u.name}`);
        nav("/dashboard");
    }

    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="mb-8 text-center text-3xl font-bold text-gray-800">
                <img src="./src/assets/venue_icon.png" className="mx-auto mb-4 w-30 h-30" />
                <h1>Venue Management System</h1>
            </div>
            
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md px-8 py-7">
                <div className="flex flex-col gap-5">



                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">  Enter Email  :  </label>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)} 
                        className="w-full h-13 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                
                <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">  Enter Password  :  </label>
                    <input type="password"  placeholder="Enter Password" value={pass} onChange={(p) => setpass(p.target.value)}  
                            className="w-full h-13 px-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                
                <div className="flex justify-center mt-3 gap-3">
                    <button onClick={onLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                    <button onClick={() => nav("/user/create")} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Create New User
                    </button>
                </div>

            </div>
            </div>
        </div>
    )


}
export default Login;