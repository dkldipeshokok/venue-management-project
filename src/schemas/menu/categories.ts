import * as yup from "yup";

export const categorySchema = yup.object({
    id: yup
        .string()
        .optional(),
    name: yup
        .string()
        .required(),
    subcategories: yup
        .number()
        .default(0),
    status: yup
        .string()
        .oneOf(["Active","Inactive"],"Choose the status")
        .required(),
});
export type CategoryValues = yup.InferType<typeof categorySchema>;