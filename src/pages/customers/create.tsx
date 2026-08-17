import { useNavigate } from "react-router-dom";
import { customerSchema, type CustomerValues, } from "@/schemas/customer";
import { toast } from "sonner";
import { DynamicForm } from "@/components/FormComponent/Form";
import customerFields from "@/components/fields/customer";

function Create(){
    const navigate = useNavigate();
    
    function OnSubmit (data: CustomerValues){
            const storedCustomers = localStorage.getItem("customers");
            const customers : CustomerValues[] = storedCustomers ? JSON.parse(storedCustomers) : [];
            const updatedcustomers = [...customers,data];
            localStorage.setItem("customers", JSON.stringify(updatedcustomers));

            toast.success("Customer saved successfully!");
            setTimeout(()=>{
                    navigate("/customer");
            },2000);
    }
    
    
    
      return(
        <DynamicForm<CustomerValues> 
                fields={customerFields} 
                schema={customerSchema}
                defaultValues={{
                    name:"Ram",
                    phone:"1234567890",
                    email:"heloo983@hallow.com",
                    organization:"Hallow",
                    status:""
                }
                }
                onSubmit={OnSubmit}
                onCancel={() => navigate("/customer")}
                featureName="Create"
                formDescription="Enter customer Details"
                mode="create"
                submitButtonText="Save Customer"
                cancelButtonText="Cancel"
            />
    )
}
export default Create;