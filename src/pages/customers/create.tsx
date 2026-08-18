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

            const newC : CustomerValues = {...data, id: customers.length+1};    

            const updatedcustomers = [...customers,newC];
            localStorage.setItem("customers", JSON.stringify(updatedcustomers));

            toast.success("Customer saved successfully!");
            setTimeout(()=>{
                    navigate("/customer");
            },900);
    }
    
    
    
      return(
        <DynamicForm<CustomerValues> 
                fields={customerFields} 
                schema={customerSchema}
                defaultValues={{
                    name:"",
                    phone:"",
                    email:"",
                    organization:"",
                    status: "Active",
                }
                }
                onSubmit={OnSubmit}
                onCancel={() => navigate("/customer")}
                featureName="Customer"
                formDescription="Enter customer Details"
                mode="create"
                submitButtonText="Save Customer"
                cancelButtonText="Cancel"
            />
    )
}
export default Create;