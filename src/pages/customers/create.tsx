import { useNavigate } from "react-router-dom";
import { customerSchema, type CustomerValues, } from "@/schemas/customer";
import { toast } from "sonner";
import { DynamicForm } from "@/components/FormComponent/Form";
import customerFields from "@/components/fields/customer";

function Create(){
    const navigate = useNavigate();
    
    function OnSubmit (data: CustomerValues){
        const storedData = localStorage.getItem("customers");
        const customers : CustomerValues[] = storedData ? JSON.parse(storedData) : [];

        const newID = customers.reduce((highest, customer) => {
                const match = String(customer.id ?? "").match(/^CUS(\d+)$/);                        const numericId = match ? Number(match[1]) : Number(customer.id) || 0;
                return Math.max(highest, numericId);
                }, 0);
        const newId = `CUS${String(newID + 1).padStart(6, "0")}`;
        const newC : CustomerValues = {...data, id: newId};    

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