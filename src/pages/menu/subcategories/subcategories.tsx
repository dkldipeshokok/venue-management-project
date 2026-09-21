import {DataTables} from "@/components/TableComponent/Table";
import subcategoryCol from "@/components/columns/menu/subcategories";
import PageHeader from "@/components/common/PageHeader";
import type { SubCategoryValues } from "@/schemas/menu/subcategories";
import { useEffect, useState } from "react";
import {toast} from "sonner"

function MenuSubCategories() {
  const [C, setC] = useState<SubCategoryValues[]>([]);


  useEffect(() => {
    const storedData = localStorage.getItem("subcategories");
    if (storedData) {
      setC(JSON.parse(storedData));
    }
  }, []);





  const DeleteSubCategory = (id: string) => {
    const subcategory = C.find(
        (item) => String(item.id) === id
    );

    if(!subcategory){
        return;
    }

    const updatedSubCategory = C.filter(
        (item) => String(item.id) !== id
    );

    localStorage.setItem("subcategories", JSON.stringify(updatedSubCategory));
    setC(updatedSubCategory);

    const storedCategory = localStorage.getItem("categories");

    if(storedCategory){
        const categories = JSON.parse(storedCategory);

        const updatedCategory = categories.map((item: {id: string, subcategories: number}) => {
            if(String(item.id) === String(subcategory.category)){
                return {
                    ...item, subcategories: Math.max((item.subcategories || 0) - 1, 0) };
            }

            return item;
        });

        localStorage.setItem("categories", JSON.stringify(updatedCategory));
    }

    toast.success("Sub-category Deleted Successfully");
}

  return (
    <div className="w-full p-6">
      <PageHeader title="Menu Sub-Categories"
        description="Manage your menu sub-categories"
        createPath="/menu/subcategories/create"
        createLabel="Add Sub-Category"
      />
      <DataTables columns={subcategoryCol(DeleteSubCategory)} data = {C} />
    </div>
  );
}

export default MenuSubCategories;