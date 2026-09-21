import {DynamicForm} from "@/components/FormComponent/Form";
import {useNavigate} from "react-router-dom";
import {SubCategorySchema, type SubCategoryValues} from "@/schemas/menu/subcategories";
import SubCategoryFields from "@/components/fields/menu/subcategories";
import { useEffect, useState } from "react";
import type { FieldConfig } from "@/types/types";
import { toast } from "sonner";

function CreateMenuSubCategories() {
    const navigate = useNavigate();

    const [CAToptions, setCAToptions] = useState<FieldConfig[]>(SubCategoryFields);

    useEffect( () => {
        const StoredData = localStorage.getItem("categories");

        if(!StoredData){
             return;
        }

        const CAT = JSON.parse(StoredData);

        const categoryOptions = CAT.map((item: {id: string, name: string}) => ({
            value: item.id,
            label: item.name
        }));

        setCAToptions(
            SubCategoryFields.map((field) =>
                field.name === "category" ? {...field, options: categoryOptions} : field
            )
        );
    }, []);

    function OnSubmit(data: SubCategoryValues) {
        const storedSub = localStorage.getItem("subcategories");
        const sub: SubCategoryValues[] = storedSub ? JSON.parse(storedSub) : [];

        const newID = sub.reduce((H, C) => {
            const match = String(C.id ?? "").match(/SC(\d+)/);
            const num = match ? Number(match[1]) : 0;
            return Math.max(H, num);
        }, 0);

        const n = `SC${String(newID + 1).padStart(6, "0")}`;

        const newSUB: SubCategoryValues = {...data, id: n};

        localStorage.setItem("subcategories", JSON.stringify([...sub, newSUB]));




        const storedCategory = localStorage.getItem("categories");

        if(storedCategory){
            const categories = JSON.parse(storedCategory);

            const updatedCategory = categories.map((item: {id: string, subcategories: number}) => {
                if(String(item.id) === String(data.category)){
                    return {  ...item, subcategories: (item.subcategories || 0) + 1 };
                }

                return item;
            });

            localStorage.setItem("categories", JSON.stringify(updatedCategory));
        }



        toast.success("Sub-category saved successfully!");

        setTimeout(() => {
            navigate("/menu/subcategories");
        },900);


    }

    return (
        <DynamicForm<SubCategoryValues>
            fields={CAToptions}
            schema={SubCategorySchema}
            defaultValues={{
                name: "",
                category: "",
                status: "Active"
            }}
            onSubmit={OnSubmit}
            onCancel={() => navigate("/menu/subcategories")}
            featureName="Menu Sub-Category"
            formDescription="Enter Menu Sub-Category Details"
            mode="create"
            submitButtonText="Save Sub-Category"
            cancelButtonText="Cancel"
        />
    );
}

export default CreateMenuSubCategories;