import { DynamicForm } from "@/components/FormComponent/Form";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner"
import { packageSchema, type packageValue } from "@/schemas/menu/package";
import packageFields from "@/components/fields/menu/package";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import type { FieldConfig, FieldOption, ItemData } from "@/types/types";


function UpdateMenuPackages() {
  const nav = useNavigate();
  const {id} = useParams<{id: string}>();

  const [PKG, setPKG] = useState<packageValue | null>(null);
  const [Load, setLoad] = useState(true);

  const [PKGfields, setPKGfields] = useState<FieldConfig[]>(packageFields);

  useEffect(() => {
    const storedITM = localStorage.getItem("items");
    const items: ItemData[] = storedITM ? JSON.parse(storedITM) : [];

    const activeItemOptions: FieldOption[] = items.filter((i) => i.status === "Active").map((i) => ({
        value: i.id, label: `${i.name} (${i.unit || "Item"})`,
      }));

    setPKGfields(
      packageFields.map((field) =>
        field.name === "menuItems" ? { ...field, options: activeItemOptions } : field
      )
    );



    const storedData = localStorage.getItem("packages");
    if (!storedData || id === undefined) {
      toast.error("Package not found");
      setTimeout(() => {
        nav("/menu/packages");
      }, 900);
    setLoad(false);
    return;
    }

    const PKG: packageValue[] = JSON.parse(storedData);
    const searchedPKG = PKG.find((i) => String(i.id) === id);

    if(searchedPKG) {
      setPKG(searchedPKG);
      setLoad(false);
      return;
    }
    toast.error("Package not found!");
    
    setTimeout(() => {
      nav("/menu/packages");
    }, 900);

    setLoad(false);
  
  },[id, nav]);


  function OnUpdate(data: packageValue) {
    const storedData = localStorage.getItem("packages");

    if(!storedData || id === undefined){
      toast.error("Package not found");
      setTimeout(() => {
        nav("/menu/packages");
      }, 900);
      return;
    }

    const PKG: packageValue[] = JSON.parse(storedData);
    const PKGIndex = PKG.findIndex((i) => String(i.id) === id);

    if(PKGIndex === -1){
      toast.error("Package not found");

      setTimeout(() => {
        nav("/menu/packages");
      }, 900);

      return;
    }

    localStorage.setItem("packages", JSON.stringify(PKG));

    toast.success("Package updated successfully!");

    setTimeout(() => {
      nav("/menu/packages");
    }, 900);

  }


  if(Load){
      return(
         <div className="w-full p-6 flex items-center justify-center">
              <Loading className="h-10 w-10" />
          </div>
      );
    }

    if(!PKG){
      return(
         <div className="w-full p-6 text-center">
            <p>Package not found!!!</p>
            <p>Redirecting to package list...</p>
          </div>
      );
    }


  return (
    <DynamicForm<packageValue>
      fields={PKGfields}
      schema={packageSchema}
      defaultValues={PKG}
      onSubmit={OnUpdate}
      onCancel={() => nav("/menu/packages")}
      featureName="Menu Package"
      formDescription="Update Menu Package Details"
      mode="update"
      submitButtonText="Update Package"
      cancelButtonText="Cancel"
    />
  );
}

export default UpdateMenuPackages;