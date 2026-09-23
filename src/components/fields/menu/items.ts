import {type FieldConfig} from "@/types/types";

const itemField: FieldConfig[] = [
    {
        name : "name",
        label : "Item Name",
        type : "text",
        placeholder : "Enter Item Name"
    },
    {
        name : "category",
        label : "Category",
        type : "select",
        options : []
    },
    {
        name : "sub",
        label : "Sub Category",
        type : "select",
        options : []
    },
    {
        name : "unit",
        label : "Unit",
        type : "select",
        options : [
            {value: "Plate", label: "Plate"},
            {value: "Person", label: "Person"},
            {value: "Bottle", label: "Bottle"},
            {value: "Glass", label: "Glass"},
            {value: "Piece", label: "Piece"},
            {value: "Package", label: "Package"},
            {value: "Hour", label: "Hour"},
            {value: "Day", label: "Day"},
            {value: "Set", label: "Set"}
        ]
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
]
export default itemField;