import type { FieldConfig } from "@/types/types";

const venueFields: FieldConfig[] = [
    {
        name : "name",  
        label: "Name",
        type:"text",
        placeholder:"Enter Venue Name"
    },
    {
        name : "image",
        label: "Image",
        type:"text",
        placeholder:"Enter Image URL"
    },
    {
        name : "type",
        label: "Type",
        type:"text",
        placeholder:"Enter Venue Type"
    },
    {
        name : "price",
        label: "Price",
        type:"number",
        placeholder:"Enter Price"
    },
    {
        name : "capacity",
        label: "Capacity",
        type:"number",
        placeholder:"Enter Capacity"
    },
    {
        name : "status",
        label: "Status",
        type:"select",
        options: [
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" }
        ]
    }
];
export default venueFields;
