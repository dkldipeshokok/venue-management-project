import { categorySchema, type CategoryValues } from "@/schemas/menu/categories";
import { DynamicForm } from "@/components/FormComponent/Form";
import categoryFields from "@/components/fields/menu/categories";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


function CreateMenuCategories() {
    const nav = useNavigate();


    function OnSubmit (data: CategoryValues) {
        const storedCate = localStorage.getItem("categories");
        const cate: CategoryValues[] = storedCate ? JSON.parse(storedCate) : [];

        const newID = cate.reduce((H, C) => {
            const match = String(C.id ?? "").match(/C(\d+)/);
            const num = match ? Number(match[1]) : 0;
            return Math.max(H, num);
        }, 0);

         const n = `C${String(newID + 1).padStart(6, "0")}`;

         const newCAT: CategoryValues = {...data, id: n, subcategories: 0};

        localStorage.setItem("categories", JSON.stringify([...cate, newCAT]));
        toast.success("Category saved successfully!");
        setTimeout(() => {
            nav("/menu/categories");
        },900);
    }
   
    

    return (
        <DynamicForm<CategoryValues>
            fields={categoryFields}
            schema={categorySchema}
            defaultValues={{
                name: "",
                subcategories: 0,
                status: "Active"
            }}
            onSubmit={OnSubmit}
            onCancel={() => nav("/menu/categories")}
            featureName="Menu Category"
            formDescription="Enter Menu Category Details"
            mode="create"
            submitButtonText="Save Category"
            cancelButtonText="Cancel"
        />


    );
}

export default CreateMenuCategories;