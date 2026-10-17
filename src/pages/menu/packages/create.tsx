import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/components/FormComponent/Form";
import { useState, useEffect } from "react";
import packageFields from "@/components/fields/menu/package";
import { packageSchema, type packageValue } from "@/schemas/menu/package";
import { toast } from "sonner";
import { type FieldConfig, type FieldOption, type ItemData  } from "@/types/types";

function CreateMenuPackages() {
  const nav = useNavigate();
  const [PKGfields, setPKGfields] = useState<FieldConfig[]>(packageFields);

  useEffect(() => {
    const storedITM = localStorage.getItem("items");
    const items: ItemData[] = storedITM ? JSON.parse(storedITM) : [];

    const activeItemOptions: FieldOption[] = items.filter((i) => i.status === "Active")
      .map((i) => ({
        value: i.id,
        label: `${i.name} (${i.unit || "Item"})`,
      }));

    setPKGfields(
      packageFields.map((field) =>
        field.name === "menuItems" ? { ...field, options: activeItemOptions } : field
      )
    );
  }, []);



 
    function OnSubmit(data: packageValue) {
        const storedPKG = localStorage.getItem("packages");
        const pkg: packageValue[] = storedPKG ? JSON.parse(storedPKG) : [];

        const newID = pkg.reduce((H,C) => {
            const match = String(C.id ?? "").match(/PKG(\d+)/);
            const num = match ? Number(match[1]) : 0;
            return Math.max(H,num);
        }, 0);

        const n = `PKG${String(newID + 1).padStart(6, "0")}`;

        const newPKG: packageValue = {...data, id:n};

        localStorage.setItem("packages", JSON.stringify([...pkg, newPKG]));


        toast.success("Package saved successfully!");

        setTimeout(() => {
            nav("/menu/packages");
        },900);
    }

  return (
    <div className="w-full p-6 bg-gray-50/50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Menu Package</h1>

      <DynamicForm<packageValue>
        fields={PKGfields}
        schema={packageSchema}
        defaultValues={{
          name: "",
          price: 0,
          status: "Active",
          description: "",
        }}
        onSubmit={OnSubmit}
        onCancel={() => nav("/menu/packages")}
        featureName="Menu Package"
        mode="create"
        submitButtonText="Save Package"
        cancelButtonText="Cancel"
      />
    </div>
  );
}

export default CreateMenuPackages;