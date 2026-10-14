import type { FieldConfig } from "@/types/types";

type options = {
    customer: {value: string, label: string}[];
    venue: {value: string, label: string}[];
    PKG: {value: string, label: string}[];
}

const bookingFields = ({customer, venue, PKG}: options)  : FieldConfig[] => [
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
        type: "select",
        placeholder: "Select Menu Package",
        options: PKG
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
        name: "shift",
        label: "Shift",
        type: "select",
        placeholder: "Select Shift",
        options: [
            { value: "Whole Day", label: "Whole Day" },
            { value: "Morning", label: "Morning (7 AM - 4 PM)" },
            { value: "Evening", label: "Evening (5:30 PM - 10:30 PM)" },
        ]
    },
    {
        name: "price",
        label: "Base Price",
        type: "number",
        placeholder: "Enter Base Price",
        disabled: true
    },
    {
        name: "food",
        label: "Food Package Amount",
        type: "number",
        placeholder: "Enter Food Package Amount",
        disabled: true
    },
    {
        name: "discount",
        label: "Discount (%) ",
        type: "number",
        placeholder: "Enter Discount Percentage"
    },
    {
        name: "total",
        label: "Total",
        type: "number",
        placeholder: "Enter Total Amount",
        disabled: true
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
        placeholder: "Enter Due Amount",
        disabled: true
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
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter Description (Optional)"
    }
];

export default bookingFields;