import { packageITMCol, type foundPKGITM } from "@/components/columns/menu/package";
import type { packageValue } from "@/schemas/menu/package";
import type { CategoryData, ItemData, SubCategoryData } from "@/types/types";
import { ArrowLeft, DollarSign, Info, Layers, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { DataTables } from "@/components/TableComponent/Table";

function ReadPackage() {
    const nav = useNavigate();

    const {id} = useParams<{id: string}>();

    const [PKG, setPKG] = useState<packageValue | null>(null);
    const [foundITM, setFoundITM] = useState<foundPKGITM[]>([]);

    useEffect(() => {
        if (!id) {
            toast.error("Invalid Package ID");
            nav("/menu/packages");
            return;
        }

        const storedPKG = localStorage.getItem("packages");
        if(storedPKG) {
            const PKG: packageValue[] = JSON.parse(storedPKG);
            const searchedPKG = PKG.find((i) => String(i.id) === String(id));

            setPKG(searchedPKG ?? null);
            if (searchedPKG) {
                const storedITM = localStorage.getItem("items");
                const items: ItemData[] = storedITM ? JSON.parse(storedITM) : [];

                const storedCAT = localStorage.getItem("categories");
                const categories: CategoryData[] = storedCAT ? JSON.parse(storedCAT) : [];

                const storedSC = localStorage.getItem("subcategories");
                const subcategories: SubCategoryData[] = storedSC ? JSON.parse(storedSC) : [];

                const itemID = searchedPKG.menuItems || [];

                const found : foundPKGITM[] = itemID.map((itm) => {
                    const item = items.find((i) => String(i.id) === String(itm));
                    const category = categories.find((c) => String(c.id) === String(item?.category));
                    const subcategory = subcategories.find((s) => String(s.id) === String(item?.sub));
                
            return {
                id: item?.id || String(itemID),
                name: item?.name || "Unknown Item",
                categoryName: category?.name || "-",
                subCategoryName: subcategory?.name || "-",
            };
        });

        setFoundITM(found);
      }
    }
  }, [id, nav]);


  if (!PKG) {
    return (
      <div className="w-full min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-500 font-medium">Package details not found.</p>
        <button
          onClick={() => nav("/menu/packages")}
          className="inline-flex items-center text-sm text-blue-600 hover:underline font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Packages
        </button>
      </div>
    );
  }

    return (
        <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => nav("/menu/packages")} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition cursor-pointer" >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Packages
        </button>
      </div>


      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
    
        <div className="bg-gray-700 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{PKG.name}</h1>
            <p className="text-xs text-blue-100 mt-0.5">Code: {PKG.id}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              PKG.status === "Active"
                ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}
          >
            {PKG.status}
          </span>
        </div>

        <div className="p-6 space-y-8">
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-700 bg-gray-200 p-4 rounded-lg border border-gray-100">
              <DollarSign className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Package Price</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  Rs. {Number(PKG.price || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-700 bg-gray-200 p-4 rounded-lg border border-gray-100">
              <Layers className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Included Items</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">{foundITM.length} Items</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-2">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <Info className="w-4 h-4 mr-2 text-blue-600" /> Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-200 p-4 rounded-lg border border-gray-100">
              {PKG.description && PKG.description.trim() !== "" ? PKG.description : "No description provided for this package."}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <PackageCheck className="w-4 h-4 mr-2 text-blue-600" /> Included Menu Items
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <DataTables columns={packageITMCol()} data={foundITM} searchHide={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default ReadPackage;