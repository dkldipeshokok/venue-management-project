import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/components/FormComponent/Form";
import { useState, useEffect } from "react";
import itemField from "@/components/fields/menu/items";
import { itemSchema, type itemValue } from "@/schemas/menu/items";
import {toast} from "sonner";
import { type FieldConfig, type FieldOption, type SubCategoryData } from "@/types/types";

function CreateMenuItems() {
    const nav = useNavigate();
    const [ITMfield, setITMfield] = useState<FieldConfig[]>(itemField);

    useEffect ( () => {
        const storedCAT = localStorage.getItem("categories");
        const CAT = storedCAT ? JSON.parse(storedCAT) : [];
        const CAToptions: FieldOption[] = CAT.map((i : {id:string, name:string}) => (
            { value : i.id, label: i.name }
        ));

        const storedSC = localStorage.getItem("subcategories");
        const SC = storedSC ? JSON.parse(storedSC) : [];


        setITMfield( 
            itemField.map((field) => {
                if(field.name === "category"){
                    return {...field, options: CAToptions };
                }
                if(field.name === "sub"){
                    return{ ...field,
                        options : (formValues : Record<string, any> ) : FieldOption[] => {
                            const selectedCATid =  formValues?.category;
                            if(!selectedCATid) return [];
                            return SC.filter(( i : SubCategoryData ) => String(i.category) === String(selectedCATid))
                                        .map(( i : SubCategoryData ) => ({value: i.id, label:i.name}));
                        },
                    };
                }
                return field;
            })
        );
    }, [] );

    function OnSubmit(data: itemValue){
        const storeditm = localStorage.getItem("items");
        const itm: itemValue[] = storeditm ?JSON.parse(storeditm) : [];

        const newID = itm.reduce((H,C) => {
            const match = String(C.id ?? "").match(/ITM(\d+)/);
            const num = match ? Number(match[1]) : 0;
            return Math.max(H,num);
        }, 0);

        const n = `ITM${String(newID + 1).padStart(6, "0")}`;

        const newITM: itemValue = {...data, id:n};

        localStorage.setItem("items", JSON.stringify([...itm, newITM]));




        toast.success("Item saved successfully!");

        setTimeout(() => {
            nav("/menu/items");
        },900);
    }

    return (
        <DynamicForm<itemValue>
            fields={ITMfield}
            schema={itemSchema}
            defaultValues={{
                name: "",
                category:"",
                sub: ""
            }
            }
            onSubmit={OnSubmit}
            onCancel={() => nav("/menu/items")}
            featureName="Menu Items"
            mode="create"
            submitButtonText="Save Item"
            cancelButtonText="Cancel"
         />
    );
}

export default CreateMenuItems;