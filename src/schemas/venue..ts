import * as yup from "yup";

export const venueSchema = yup.object({
    id: yup
        .string()
        .optional(),
    name: yup
        .string()
        .required(),
    image: yup
        .string()
        .required(),
    type: yup
        .string()
        .required(),
    price: yup
        .number()
        .required(),
    capacity: yup
        .number()
        .required(),
    status: yup
        .string()
        .oneOf(["Active","Inactive"],"Choose the status")
        .required(),

});

export type VenueValues = yup.InferType<typeof venueSchema>;