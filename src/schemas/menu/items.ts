import * as yup from "yup";

export const itemSchema = yup.object({
    id: yup
        .string()
        .optional(),
    name: yup
        .string()
        .required(),
    unit: yup
        .string()
        .oneOf(["Plate", "Person", "Bottle", "Glass", "Piece", "Package", "Hour", "Day", "Set"],"Choose Unit")
        .required(),
    category: yup
        .string()
        .required("You need to select a category"),
    sub: yup
        .string()
        .required("You need to select a subcategory"),
     status: yup
        .string()
        .oneOf(["Active","Inactive"],"Choose the status")
        .required(),
})

export type itemValue = yup.InferType<typeof itemSchema>