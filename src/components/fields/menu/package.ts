import type {FieldConfig} from "@/types/types";

const packageField: FieldConfig[] = [
    {
        name : "name",
        label : "Package Name",
        type : "text",
        placeholder : "Enter Package Name"
    },
    {
        name : "price",
        label : "Package Price",
        type : "number",
        placeholder : "Enter Package Price"
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" }
        ]
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter Package Description"
    },
    {
        name: "menuItems",
        label: "Menu Items",
        type: "multiselect",
        options: []
    }
]
export default packageField;