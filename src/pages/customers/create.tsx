import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import { customerSchema, type CustomerFormValues, } from "@/schemas/customer";
import { Button, Input} from "@/components/index";

function Create(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors },} = useForm<CustomerFormValues>({  resolver: yupResolver(customerSchema),});
    
    function OnSubmit (data: CustomerFormValues){
            console.log("Save",data);
    }
    
    
    
      return(
        <div className="w-full p-6 flex flex-col gap-2 items-center">
            <div className="text-lg mb-6 font-bold">
                <h2>Add a new Customer</h2>
            </div>




            <form  onSubmit={handleSubmit(OnSubmit, (errors) => console.log("Validation errors:", errors))} className="w-full max-w-3xl space-y-8">

                <div className="flex items-center gap-5">
                    <label className="w-40 text-lg font-medium"> Customer Name : </label>
                    <Input  {...register("name")} placeholder="Enter Customer Name" className="bg-gray-300 h-12 w-[450px] text-base" />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>


                <div className="flex items-center gap-3">
                    <label className="w-40 text-lg font-medium">  Email :  </label>

                    <Input {...register("email")} placeholder="Enter Customer Email" type="email" className="bg-gray-300 h-12 w-[450px] text-base"  />
                    {errors.email && (
                        <p className="text-sm text-red-500"> {errors.email.message} </p>
                    )}
                </div>


                <div className="flex items-center gap-3">
                    <label className="w-40 text-lg font-medium"> Phone : </label>
                    <Input {...register("phone")} placeholder="Enter phone number"  className="bg-gray-300 h-12 w-[450px] text-base"  />
                    {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                </div>


                <div className="flex items-center gap-3">
                    <label className="w-40 text-lg font-medium"> Organization : </label>
                    <Input {...register("organization")} placeholder="Enter the name of organization" className="bg-gray-300 h-12 w-[450px] text-base" />
                    {errors.organization &&(
                        <p className="text-sm text-red-500">{errors.organization.message}</p>
                    )}
                </div>


                <div className="flex items-center gap-3">
                    <Button type="submit" className="bg-blue-500 px-6 py-3 text-base font-bold text-white transition hover:bg-green-600 hover:scale-105" > Save Customer </Button>
                    <Button type="button" variant="outline" className="bg-blue-500 px-6 py-3 text-base font-bold text-white transition hover:bg-red-600 hover:scale-105" onClick={() => navigate("/customer")} > Cancel </Button>           
                </div>

            </form>
        </div>
    )
}
export default Create;