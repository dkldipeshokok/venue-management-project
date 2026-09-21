import { DynamicForm } from "@/components/FormComponent/Form";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "sonner"
import { SubCategorySchema, type SubCategoryValues } from "@/schemas/menu/subcategories";
import SubCategoryFields from "@/components/fields/menu/subcategories";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import type { FieldConfig } from "@/types/types";

function UpdateMenuSubCategories() {
  const nav = useNavigate();
  const {id} = useParams<{id: string}>();

  const [C, setC] = useState<SubCategoryValues | null>(null);
  const [Load, setLoad] = useState(true);
  const [CAToptions, setCAToptions] = useState<FieldConfig[]>(SubCategoryFields);

  useEffect(() => {
    const storedCategory = localStorage.getItem("categories");

    if(storedCategory){
      const CAT = JSON.parse(storedCategory);

      const categoryOptions = CAT.map((item: {id: string, name: string}) => ({
        value: item.id,
        label: item.name
      }));

      setCAToptions(
        SubCategoryFields.map((field) =>
          field.name === "category"
            ? {...field, options: categoryOptions}
            : field
        )
      );
    }

    const storedData = localStorage.getItem("subcategories");

    if (!storedData || id === undefined) {
      toast.error("Sub-category not found");
      setTimeout(() => {
        nav("/menu/subcategories");
      }, 900);
      setLoad(false);
      return;
    }

    const SUB: SubCategoryValues[] = JSON.parse(storedData);
    const searchedSUB = SUB.find((i) => String(i.id) === id);

    if(searchedSUB) {
      setC(searchedSUB);
      setLoad(false);
      return;
    }

    toast.error("Sub-category not found!");

    setTimeout(() => {
      nav("/menu/subcategories");
    }, 900);

    setLoad(false);

  },[id, nav]);


  function OnUpdate(data: SubCategoryValues) {
    const storedData = localStorage.getItem("subcategories");

    if(!storedData || id === undefined){
      toast.error("Sub-category not found");
      setTimeout(() => {
        nav("/menu/subcategories");
      }, 900);
      return;
    }

    const SUB: SubCategoryValues[] = JSON.parse(storedData);
    const SUBIndex = SUB.findIndex((i) => String(i.id) === id);

    if(SUBIndex === -1){
      toast.error("Sub-category not found");

      setTimeout(() => {
        nav("/menu/subcategories");
      }, 900);

      return;
    }

    SUB[SUBIndex] = {...data, id: SUB[SUBIndex].id};

    localStorage.setItem("subcategories", JSON.stringify(SUB));

    toast.success("Sub-category updated successfully!");

    setTimeout(() => {
      nav("/menu/subcategories");
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
            <p>Sub-category not found!!!</p>
            <p>Redirecting to sub-category list...</p>
          </div>
      );
    }


  return (
    <DynamicForm<SubCategoryValues>
      fields={CAToptions}
      schema={SubCategorySchema}
      defaultValues={C}
      onSubmit={OnUpdate}
      onCancel={() => nav("/menu/subcategories")}
      featureName="Menu Sub-Category"
      formDescription="Update Menu Sub-Category Details"
      mode="update"
      submitButtonText="Update Sub-Category"
      cancelButtonText="Cancel"
    />
  );
}

export default UpdateMenuSubCategories;