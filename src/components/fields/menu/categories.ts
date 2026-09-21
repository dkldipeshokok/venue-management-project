import type { FieldConfig } from "@/types/types";

const categoryFields: FieldConfig[] = [
    {
        name : "name",
        label: "Category Name",
        type:"text",
        placeholder:"Enter Category Name"
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" }
        ]
    }
];
export default categoryFields;