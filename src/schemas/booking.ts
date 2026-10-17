import * as yup from "yup";

export const bookingSchema = yup.object({
    id: yup
        .string()
        .optional(),
    customer: yup
        .string()
        .required(),
    venue: yup
        .string()
        .required(),
    type: yup
        .string()
        .required(),
    package: yup
        .string()
        .required(),
    bookfrom: yup
        .string()
        .required(),
    bookto: yup
        .string()
        .required(),
    guest: yup
        .number()
        .required(),
    price: yup
        .number()
        .required(),
    food: yup
        .number()
        .required(),
    discount: yup
        .number()
        .min(0, "Discount cannot be less than 0%")
        .max(100, "Discount cannot exceed 100%")
        .required("Discount is required"),
    total: yup
        .number()
        .required(),
    advance: yup
        .number()
        .required(),
    due: yup
        .number()
        .required(),
    status: yup
        .string()
        .oneOf(["Pending", "Confirmed", "Completed", "Cancelled"], "Choose the status")
        .required("Status is required"),
    shift: yup
        .string()
        .oneOf([ "Whole Day", "Morning", "Evening"], "Choose the start shift")
        .required(),
    description: yup
        .string()
        .optional()
});

export type BookingValues = yup.InferType<typeof bookingSchema>;