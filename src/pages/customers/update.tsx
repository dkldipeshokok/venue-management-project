import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type CustomerValues, customerSchema} from "@/schemas/customer";
import { DynamicForm } from "@/components/FormComponent/Form";
import customerFields from "@/components/fields/customer";

function Update() {
  const { id } = useParams();
  const nav = useNavigate();
  const [c, setc] = useState<CustomerValues | null>(null);
  
  useEffect(() => {
      const storedCustomers = localStorage.getItem("customers");

      if (!storedCustomers || id === undefined) {
          return;
      }

      const customers: CustomerValues[] = JSON.parse(storedCustomers);

      for (const customer of customers) {
        if (String(customer.id) === id) {
          setc(customer);
          return;
        }
      }

      toast.error("Customer not found!");
    }, [id]);


  function OnSubmit(data: CustomerValues) {
    const storedCustomers = localStorage.getItem("customers");

    if (!storedCustomers || id === undefined) {
      toast.error("Customer not found!");
      return;
    }

    const customers: CustomerValues[] = JSON.parse(storedCustomers);

    const cid = Number(id);

    if (
      Number.isNaN(cid) ||
      cid < 0 ||
      cid >= customers.length
    ) {
      toast.error("Customer not found!");
      return;
    }

    customers[cid] = data;

    localStorage.setItem("customers", JSON.stringify(customers));

    toast.success("Customer updated successfully!");

    setTimeout(() => {
      nav("/customer");
    }, 900);
  }

  if (!c) {
    return (
      <div className="w-full p-6">
        <p>Loading customer...</p>
      </div>
    );
  }

  return (
    <DynamicForm<CustomerValues>
      fields={customerFields}
      schema={customerSchema}
      defaultValues={c}
      onSubmit={OnSubmit}
      onCancel={() => nav("/customer")}
      featureName="Customer"
      formDescription="Update customer details"
      mode="update"
      submitButtonText="Update Customer"
      cancelButtonText="Cancel"
    />
  );
}

export default Update;