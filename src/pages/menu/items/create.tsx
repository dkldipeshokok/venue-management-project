import { useNavigate } from "react-router-dom";
import { DynamicForm } from "@/components/FormComponent/Form";
import { useState, useEffect } from "react";
import itemField from "@/components/fields/menu/items";
import { itemSchema, type itemValue } from "@/schemas/menu/items";
import {toast} from "sonner";
import { type FieldConfig } from "@/types/types";

function CreateMenuItems() {
    const nav = useNavigate();
    const [Coptions, setCoptions] = useState<FieldConfig[]>(itemField);
    const [SCoptions, setSCoptions] = useState<FieldConfig[]>(itemField);

    useEffect ( () => {
        const storedCAT = localStorage.getItem("categories");
        if(!storedCAT){
            return;
        }
        const CAT = JSON.parse(storedCAT);
        const CAToptions = CAT.map((i : {id:string, name:string}) => (
            { value : i.id, label: i.name }
        ));

        setCoptions(
            itemField.map((field) => 
                field.name === "category" ? {...field, options : CAToptions} : field
        )
        );
        
        
        const storedSC = localStorage.getItem("subcategories");
        if(!storedSC){
            return;
        }
        const SC = JSON.parse(storedSC);
        const SCoptions = SC.map (( i : {id:string, name:string}) => (
            {value : i.id, label : i.name}
        ));

        setSCoptions(
            itemField.map((field) => 
                field.name === "sub" ? {...field, options : SCoptions} : field
            )
        );


    }, [] )

    return (
        <div>
            <h1>Create Menu Item</h1>
        </div>
    );
}

export default CreateMenuItems;