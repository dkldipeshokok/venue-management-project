import * as yup from "yup";

export const bookingSchema = yup.object({
    id: yup
        .string()
        .optional(),
    customer: yup
        .string()
        .required(),
    bookby: yup
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
        .optional(),
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
        .optional(),
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
});

export type BookingValues = yup.InferType<typeof bookingSchema>;