import {type FieldConfig} from "@/types/types";

const SubCategoryFields: FieldConfig[] = [
    {
        name: "name",
        label: "Subcategory Name",
        type: "text",
        placeholder: "Enter subcategory name",
    },
    {
        name: "category",
        label: "Category",
        type: "select",
        options: [],
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" }
        ],
    }
]

export default SubCategoryFields;