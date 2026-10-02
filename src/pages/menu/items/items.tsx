import { DataTables } from "@/components/TableComponent/Table";
import itemCol from "@/components/columns/menu/items";
import PageHeader from "@/components/common/PageHeader";
import type { itemValue } from "@/schemas/menu/items";
import type { SubCategoryData } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function MenuItems() {
  const [ITM, setITM] = useState<itemValue[]>([]);
  const [C, setC] = useState<{ id: string; name: string }[]>([]);
  const [SC, setSC] = useState<SubCategoryData[]>([]);

  useEffect(() => {
    const storedITM = localStorage.getItem("items");
    if (storedITM) setITM(JSON.parse(storedITM));

    const storedC = localStorage.getItem("categories");
    if (storedC) setC(JSON.parse(storedC));

    const storedSC = localStorage.getItem("subcategories");
    if (storedSC) setSC(JSON.parse(storedSC));
  }, []);

  const DeleteItem = (id: string) => {
    const itemToDelete = ITM.find((item) => String(item.id) === id);
    if (!itemToDelete) return;

    const updatedITM = ITM.filter((item) => String(item.id) !== id);

    localStorage.setItem("items", JSON.stringify(updatedITM));
    setITM(updatedITM);

    toast.success("Item deleted successfully!");
  };

  return (
    <div className="w-full p-6 space-y-8">
      <PageHeader
        title="Menu Items"
        description="Manage your menu items grouped by Category and Subcategory"
        createPath="/menu/items/create"
        createLabel="Add Menu Item"
      />

      {C.map((category) => {
        const itm = ITM.some( (item) => String(item.category) === String(category.id));

        if (!itm) return null;

        const catSC = SC.filter((i) => String(i.category) === String(category.id));

        return (
          <div key={category.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm" >
            <div className="bg-emerald-600 text-white px-4 py-3 font-semibold text-xl">
              {category.name}
            </div>

            <div className="p-4 space-y-6">
              {catSC.map((SCat) => {
                const subCatITM = ITM.filter(
                  (item) => String(item.sub) === String(SCat.id)
                );

                if (subCatITM.length === 0) return null;

                return (
                  <div key={SCat.id} className="border border-gray-100 rounded-md p-3 bg-gray-50/50" >
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <h3 className="text-md font-medium text-gray-800">   {SCat.name}  </h3>

                      <span className="text-xs text-gray-500">
                        ({subCatITM.length}{" "}
                        {subCatITM.length === 1 ? "item" : "items"})
                      </span>
                    </div>

                    <DataTables
                      columns={itemCol(DeleteItem) }
                      data={subCatITM}
                      searchHide={true}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MenuItems;