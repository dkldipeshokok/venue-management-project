import * as yup from "yup"; 

export const SubCategorySchema = yup.object({
    id: yup
        .string()
        .optional(),
    name: yup
        .string()
        .required(),
    category: yup
        .string()
        .required("You need to select a category"),
    status: yup
        .string()
        .oneOf(["Active","Inactive"],"Choose the status")
        .required(),
})

export type SubCategoryValues = yup.InferType<typeof SubCategorySchema>;