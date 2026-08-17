import type { FieldConfig } from "@/types/types";

const customerFields: FieldConfig[] = [
    {
        name : "name",
        label: "Name",
        type:"text",
        placeholder:"Enter Customer Name"
    },
    {
        name : "organization",
        label: "Organization",
        type:"text",
        placeholder:"Enter the name of organization"
    },
    {
        name : "phone",
        label: "Phone",
        type:"text",
        placeholder:"Enter Phone number"
    },
    {
        name : "email",
        label: "Email",
        type:"text",
        placeholder:"Enter your email"
    },
    {
        name : "status",
        label: "Status",
        type: "select",
        placeholder:"Choose the status",
        options: [
            {label: "Active", value: "Value"},
            {label: "Inactive", value: "Inactive" }
        ],
    },
    
];
export default customerFields;