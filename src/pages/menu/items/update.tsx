import { DynamicForm } from "@/components/FormComponent/Form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { itemSchema, type itemValue } from "@/schemas/menu/items";
import itemField from "@/components/fields/menu/items";
import { useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import type { FieldConfig, FieldOption, SubCategoryData } from "@/types/types";

function UpdateMenuItems() {
  const nav = useNavigate();
  const {id} = useParams<{ id: string }>();

  const [itemData, setItemData] = useState<itemValue | null>(null);
  const [load, setLoad] = useState(true);
  const [ITMfields, setITMfields] = useState<FieldConfig[]>(itemField);

  useEffect(() => {
    const storedCAT = localStorage.getItem("categories");
    const CAT = storedCAT ? JSON.parse(storedCAT) : [];
    const CAToptions: FieldOption[] = CAT.map((i: { id: string; name: string }) => ({
      value: i.id,
      label: i.name,
    }));

    const storedSC = localStorage.getItem("subcategories");
    const SC = storedSC ? JSON.parse(storedSC) : [];

    setITMfields(
      itemField.map((field) => {
        if (field.name === "category") {
          return { ...field, options: CAToptions };
        }
        if (field.name === "sub") {
          return {...field, options: (formValues: Record<string, any>): FieldOption[] => {
              const selectedCATid = formValues?.category;
              if (!selectedCATid) return [];
              return SC.filter( (i: SubCategoryData) => String(i.category) === String(selectedCATid))
                        .map((i: SubCategoryData) => ({ value: i.id, label: i.name }));
            },
          };
        }
        return field;
      })
    );

    const storedItems = localStorage.getItem("items");

    if (!storedItems || id === undefined) {
      toast.error("Item not found");
      setTimeout(() => nav("/menu/items"), 900);
      setLoad(false);
      return;
    }

    const itemsList: itemValue[] = JSON.parse(storedItems);
    const targetItem = itemsList.find((i) => String(i.id) === id);

    if (targetItem) {
      setItemData(targetItem);
      setLoad(false);
      return;
    }

    toast.error("Item not found!");
    setTimeout(() => nav("/menu/items"), 900);
    setLoad(false);
  }, [id, nav]);

  function OnUpdate(data: itemValue) {
    const storedItems = localStorage.getItem("items");

    if (!storedItems || id === undefined) {
      toast.error("Item not found");
      setTimeout(() => nav("/menu/items"), 900);
      return;
    }

    const itemsList: itemValue[] = JSON.parse(storedItems);
    const itemIndex = itemsList.findIndex((i) => String(i.id) === id);

    if (itemIndex === -1) {
      toast.error("Item not found");
      setTimeout(() => nav("/menu/items"), 900);
      return;
    }

    itemsList[itemIndex] = { ...data, id: itemsList[itemIndex].id };
    localStorage.setItem("items", JSON.stringify(itemsList));
    toast.success("Item updated successfully!");
    setTimeout(() => {
      nav("/menu/items");
    }, 900);
  }

  if (load) {
    return (
      <div className="w-full p-6 flex items-center justify-center">
        <Loading className="h-10 w-10" />
      </div>
    );
  }

  if (!itemData) {
    return (
      <div className="w-full p-6 text-center">
        <p>Item not found!</p>
        <p>Redirecting to items list...</p>
      </div>
    );
  }

  return (
    <DynamicForm<itemValue>
      fields={ITMfields}
      schema={itemSchema}
      defaultValues={itemData}
      onSubmit={OnUpdate}
      onCancel={() => nav("/menu/items")}
      featureName="Menu Item"
      formDescription="Update Menu Item Details"
      mode="update"
      submitButtonText="Update Item"
      cancelButtonText="Cancel"
    />
  );
}

export default UpdateMenuItems;