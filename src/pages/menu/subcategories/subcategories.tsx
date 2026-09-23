import {DataTables} from "@/components/TableComponent/Table";
import subcategoryCol from "@/components/columns/menu/subcategories";
import PageHeader from "@/components/common/PageHeader";
import type { SubCategoryValues } from "@/schemas/menu/subcategories";
import { useEffect, useState } from "react";
import {toast} from "sonner"

function MenuSubCategories() {
  const [SC, setSC] = useState<SubCategoryValues[]>([]);
  const [C, setC] = useState<{id: string, name: string}[]>([]);


  useEffect(() => {
    const storedSC = localStorage.getItem("subcategories");
    if (storedSC) {
      setSC(JSON.parse(storedSC));
    }

    const storedC = localStorage.getItem("categories");
    if(storedC) {
      setC(JSON.parse(storedC));
    }
  }, []);





  const DeleteSubCategory = (id: string) => {
    const subcategory = SC.find(
        (item) => String(item.id) === id
    );

    if(!subcategory){
        return;
    }

    const updatedSubCategory = SC.filter(
        (item) => String(item.id) !== id
    );

    localStorage.setItem("subcategories", JSON.stringify(updatedSubCategory));
    setSC(updatedSubCategory);

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

      {C.map((category) => {
        const CATSC = SC.filter( ( i ) => String(i.category) === String(category.id) );
        return(
          <div key={category.id} className="border border-gray-200 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-3 bg-green-500 px-3 py-3 rounded-md">{category.name}</h2>
              <DataTables columns={subcategoryCol(DeleteSubCategory)} data = {CATSC} searchHide = {true}  />
          </div>
        )
      } )}
    </div>
  );
}

export default MenuSubCategories;