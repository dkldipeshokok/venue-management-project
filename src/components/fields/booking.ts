import type { FieldConfig } from "@/types/types";

type options = {
    customer: {value: string, label: string}[];
    venue: {value: string, label: string}[];

}

const bookingFields = ({customer, venue}: options)  : FieldConfig[] => [
    {
        name: "customer",
        label: "Customer",
        type: "select",
        placeholder: "Select Customer",
        options: customer
    },
    {
        name: "venue",
        label: "Venue",
        type: "select",
        placeholder: "Select Venue",
        options: venue
    },
    {
        name: "type",
        label: "Event Type",
        type: "text",
        placeholder: "Enter Event Type"
    },
    {
        name: "package",
        label: "Menu Packages",
        type: "text",
        placeholder: "Enter Menu Package"
    },
    {
        name: "bookfrom",
        label: "Booked From",
        type: "date",
        placeholder: "Select Start Date"
    },
    {
        name: "bookto",
        label: "Booked To",
        type: "date",
        placeholder: "Select End Date"
    },
    {
        name: "guest",
        label: "Guests",
        type: "number",
        placeholder: "Enter Number of Guests"
    },
    {
        name: "price",
        label: "Base Price",
        type: "number",
        placeholder: "Enter Base Price"
    },
    {
        name: "food",
        label: "Food Package Amount",
        type: "number",
        placeholder: "Enter Food Package Amount"
    },
    {
        name: "discount",
        label: "Discount",
        type: "number",
        placeholder: "Enter Discount Amount"
    },
    {
        name: "total",
        label: "Total",
        type: "number",
        placeholder: "Enter Total Amount"
    },
    {
        name: "advance",
        label: "Advance",
        type: "number",
        placeholder: "Enter Advance Amount"
    },
    {
        name: "due",
        label: "Due",
        type: "number",
        placeholder: "Enter Due Amount"
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { value: "Pending", label: "Pending" },
            { value: "Confirmed", label: "Confirmed" },
            { value: "Completed", label: "Completed" },
            { value: "Cancelled", label: "Cancelled" }
        ]
    }
];

export default bookingFields;