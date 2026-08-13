import type { FieldConfig } from "@/types/types";

const customerFields: FieldConfig[] = [
    {
        name : "name",
        label: "Name",
        type:"text"
    },
    {
        name : "organization",
        label: "Organization",
        type:"text"
    },
    {
        name : "phone",
        label: "Phone",
        type:"text"
    },
    {
        name : "email",
        label: "Email",
        type:"text"
    },
    {
        name : "status",
        label: "Status",
        type: "select",
        options: [
            {label: "Active", value: "Value"},
            {label: "Inactive", value: "Inactive" }
        ],
    },
    
];
export default customerFields;