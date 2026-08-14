import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import { customerSchema, type CustomerFormValues, } from "@/schemas/customer";
import { Button, Input} from "@/components/index";
import { toast } from "sonner";

function Create(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors },} = useForm<CustomerFormValues>({  resolver: yupResolver(customerSchema),});
    
    function OnSubmit (data: CustomerFormValues){
            console.log("Save",data);
            const storedCustomers = localStorage.getItem("customers");
            const customers : CustomerFormValues[] = storedCustomers ? JSON.parse(storedCustomers) : [];
            const updatedcustomers = [...customers,data];
            localStorage.setItem("customers", JSON.stringify(updatedcustomers));

            toast.success("Customer saved successfully!");
            setTimeout(()=>{
                    navigate("/customer");
            },2000);
    }
    
    
    
      return(
        <div className="w-full p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl mb-6">
                <h2 className="text-lg font-bold text-center">Add a new Customer</h2>
            </div>


            <form  onSubmit={handleSubmit(OnSubmit, (errors) => console.log("Validation errors:", errors))} 
                    className="w-full max-w-3xl space-y-8">

                <div className="space-y-2">
                        <label className="w-40 shrink-0 text-lg font-medium pt-3"> Customer Name : </label>
                    <div>
                        <Input  {...register("name")} placeholder="Enter Customer Name" 
                                className="h-12 w-full bg-gray-300 text-base" />
                        {errors.name && (
                        <p className="mt-1 text-base text-red-500">{errors.name.message}</p>
                    )}
                    </div>
                </div>


                <div className="space-y-2">
                       <label className="w-40 shrink-0 text-lg font-medium pt-3">  Email :  </label>
                    <div>
                        <Input {...register("email")} placeholder="Enter Customer Email" type="email" 
                                className="h-12 w-full bg-gray-300 text-base"  />
                        {errors.email && (
                        <p className="mt-1 text-base text-red-500"> {errors.email.message} </p>
                    )}
                    </div>
                </div>

                <div className="space-y-2">
                        <label className="w-40 shrink-0 text-lg font-medium pt-3"> Phone : </label>
                    <div>
                        <Input {...register("phone")} placeholder="Enter phone number"  
                                className="h-12 w-full bg-gray-300 text-base"  />
                        {errors.phone && (
                        <p className="mt-1 text-base text-red-500">{errors.phone.message}</p>
                    )}
                    </div>
                </div>


                <div className="space-y-2">
                        <label className="w-40 shrink-0 text-lg font-medium pt-3"> Organization : </label>
                    <div>
                        <Input {...register("organization")} placeholder="Enter the name of organization" 
                                className="h-12 w-full bg-gray-300 text-base" />
                        {errors.organization &&(
                        <p className="mt-1 text-base text-red-500">{errors.organization.message}</p>
                    )}
                    </div>
                </div>


                <div className="flex items-center justify-center gap-5">
                    <Button type="submit" className="bg-blue-500 px-6 py-3 text-base font-bold text-white transition hover:bg-green-600 hover:scale-105" > Save Customer </Button>
                    <Button type="button" variant="outline" className="bg-blue-500 px-6 py-3 text-base font-bold text-white transition hover:bg-red-600 hover:scale-105" onClick={() => navigate("/customer")} > Cancel </Button>           
                </div>
            </form>
        </div>
    )
}
export default Create;