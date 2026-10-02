import {DataTables} from "@/components/TableComponent/Table";
import packageCol from "@/components/columns/menu/package";
import PageHeader from "@/components/common/PageHeader";
import type { packageValue } from "@/schemas/menu/package";
import { useEffect, useState } from "react";
import {toast} from "sonner"

function MenuPackages() {
  const [P, setP] = useState<packageValue[]>([]);


  useEffect(() => {
    const storedData = localStorage.getItem("packages");
    if (storedData) {
      setP(JSON.parse(storedData));
    }
  }, []);

  const DeletePackage = (id: string) => {
    const updatedPackage = P.filter(
      (item) => String(item.id) !== id
    );
    localStorage.setItem("packages", JSON.stringify(updatedPackage));
    setP(updatedPackage);



    const storedSC = localStorage.getItem("subcategories");

    if (storedSC){
      const SC = JSON.parse(storedSC);

      const updatedSC = SC.filter( ( i: { category : string } ) => String(i.category) !== id );

      localStorage.setItem("subcategories", JSON.stringify(updatedSC));
    }

    toast.success("Package Deleted Successfully");
  }

  return (
    <div className="w-full p-6">
      <PageHeader title="Menu Packages"
        description="Manage your menu packages"
        createPath="/menu/packages/create"
        createLabel="Add Package"
      />
      <DataTables columns={packageCol(DeletePackage)} data = {P} />
    </div>
  );
}

export default MenuPackages;