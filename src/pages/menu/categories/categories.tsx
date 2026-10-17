import {DataTables} from "@/components/TableComponent/Table";
import categoryCol from "@/components/columns/menu/categories";
import PageHeader from "@/components/common/PageHeader";
import type { CategoryValues } from "@/schemas/menu/categories";
import { useEffect, useState } from "react";
import {toast} from "sonner"

function MenuCategories() {
  const [C, setC] = useState<CategoryValues[]>([]);


  useEffect(() => {
    const storedData = localStorage.getItem("categories");
    if (storedData) {
      setC(JSON.parse(storedData));
    }
  }, []);

  const DeleteCategory = (id: string) => {
    const updatedCategory = C.filter(
      (item) => String(item.id) !== id
    );
    localStorage.setItem("categories", JSON.stringify(updatedCategory));
    setC(updatedCategory);



    const storedSC = localStorage.getItem("subcategories");

    if (storedSC){
      const SC = JSON.parse(storedSC);

      const updatedSC = SC.filter( ( i: { category : string } ) => String(i.category) !== id );

      localStorage.setItem("subcategories", JSON.stringify(updatedSC));
    }





    toast.success("Category Deleted Successfully");
  }

  return (
    <div className="w-full p-6">
      <PageHeader title="Menu Categories"
        description="Manage your menu categories"
        createPath="/menu/categories/create"
        createLabel="Add Category"
      />
      <DataTables columns={categoryCol(DeleteCategory)} data = {C} />
    </div>
  );
}

export default MenuCategories;