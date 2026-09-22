import type { FieldConfig } from "@/types/types";

const userFields: FieldConfig[] = [
    {
        name : "name",
        label: "Name",
        type: "text",
        placeholder: "Enter name"
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder:""
    },
    {
        name : "status",
        label: "Status",
        type:"select",
        options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" }
        ]
    },
    {
        name : "phone",
        label: "Phone",
        type:"text",
        placeholder:"Enter Phone number"
    },
    {
        name : "password",
        label:"Password",
        type: "password",
        placeholder: "Enter password"
    },
    {
        name : "Cpassword",
        label:"Confirm Password",
        type: "password",
        placeholder: "You need to confirm password"
    },
    {
        name : "role",
        label: "Role",
        type:"select",
        options: [
            { value: "SuperAdmin", label: "Super Admin" },
            { value: "Customer", label: "Customer" },
            { value: "Employee", label: "Employee"}
        ]
    }
];

export default userFields;
