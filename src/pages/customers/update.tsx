import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { type CustomerValues, customerSchema } from "@/schemas/customer";
import { DynamicForm } from "@/components/FormComponent/Form";
import customerFields from "@/components/fields/customer";
import Loading from "@/components/common/Loading";

function Update() {
  const { id } = useParams();
  const nav = useNavigate();

  const [c, setc] = useState<CustomerValues | null>(null);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");

    if (!storedCustomers || id === undefined) {
      toast.error("Customer not found!");

      setTimeout(() => {
        nav("/customer");
      }, 2900);

      setLoad(false);
      return;
    }

    const customers: CustomerValues[] = JSON.parse(storedCustomers);

    for (const customer of customers) {
      if (String(customer.id) === id) {
        setc(customer);
        setLoad(false);
        return;
      }
    }

    toast.error("Customer not found!");

    setTimeout(() => {
      nav("/customer");
    }, 2900);

    setLoad(false);
  }, [id, nav]);

  function OnSubmit(data: CustomerValues) {
    const storedCustomers = localStorage.getItem("customers");

    if (!storedCustomers || id === undefined) {
      toast.error("Customer not found!");

      setTimeout(() => {
        nav("/customer");
      }, 2900);

      return;
    }

    const customers: CustomerValues[] = JSON.parse(storedCustomers);

    const cid = customers.findIndex(
      (customer) => String(customer.id) === id
    );

    if (cid === -1) {
      toast.error("Customer not found!");

      setTimeout(() => {
        nav("/customer");
      }, 2900);

      return;
    }

    customers[cid] = {
      ...data,
      id: customers[cid].id,
    };

    localStorage.setItem("customers", JSON.stringify(customers));

    toast.success("Customer updated successfully!");

    setTimeout(() => {
      nav("/customer");
    }, 900);
  }

  if (Load) {
    return (
      <div className="w-full p-6 flex items-center justify-center">
        <Loading className="h-10 w-10" />
      </div>
    );
  }

  if (!c) {
    return (
      <div className="w-full p-6 text-center">
        <p>Customer not found!!!</p>
        <p>Redirecting to customer list...</p>
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