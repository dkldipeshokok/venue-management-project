import { DynamicForm } from "@/components/FormComponent/Form";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner"
import { categorySchema, type CategoryValues } from "@/schemas/menu/categories";
import categoryFields from "@/components/fields/menu/categories";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";

function UpdateMenuCategories() {
  const nav = useNavigate();
  const {id} = useParams<{id: string}>();

  const [C, setC] = useState<CategoryValues | null>(null);
  const [Load, setLoad] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("categories");
    if (!storedData || id === undefined) {
      toast.error("Category not found");
      setTimeout(() => {
        nav("/menu/categories");
      }, 900);
    setLoad(false);
    return;
    }

    const CAT: CategoryValues[] = JSON.parse(storedData);
    const searchedCAT = CAT.find((i) => String(i.id) === id);

    if(searchedCAT) {
      setC(searchedCAT);
      setLoad(false);
      return;
    }
    toast.error("Category not found!");
    
    setTimeout(() => {
      nav("/menu/categories");
    }, 900);

    setLoad(false);
  
  },[id, nav]);


  function OnUpdate(data: CategoryValues) {
    const storedData = localStorage.getItem("categories");

    if(!storedData || id === undefined){
      toast.error("Category not found");
      setTimeout(() => {
        nav("/menu/categories");
      }, 900);
      return;
    }

    const CAT: CategoryValues[] = JSON.parse(storedData);
    const CATIndex = CAT.findIndex((i) => String(i.id) === id);

    if(CATIndex === -1){
      toast.error("Category not found");

      setTimeout(() => {
        nav("/menu/categories");
      }, 900);

      return;
    }

    CAT[CATIndex] = {...data, id: CAT[CATIndex].id, subcategories: CAT[CATIndex].subcategories || 0};
    localStorage.setItem("categories", JSON.stringify(CAT));

    toast.success("Category updated successfully!");

    setTimeout(() => {
      nav("/menu/categories");
    }, 900);

    
  }


  if(Load){
      return(
         <div className="w-full p-6 flex items-center justify-center">
              <Loading className="h-10 w-10" />
          </div>
      );
    }

    if(!C){
      return(
         <div className="w-full p-6 text-center">
            <p>Category not found!!!</p>
            <p>Redirecting to category list...</p>
          </div>
      );
    }


  return (
    <DynamicForm<CategoryValues>
      fields={categoryFields}
      schema={categorySchema}
      defaultValues={C}
      onSubmit={OnUpdate}
      onCancel={() => nav("/menu/categories")}
      featureName="Menu Category"
      formDescription="Update Menu Category Details"
      mode="update"
      submitButtonText="Update Category"
      cancelButtonText="Cancel"
    />
  );
}

export default UpdateMenuCategories;