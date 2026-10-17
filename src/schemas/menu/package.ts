import * as yup from 'yup';

export const packageSchema = yup.object({
    id: yup
        .string()
        .optional(),
    name: yup
        .string()
        .required(),
    price: yup
        .number()
        .typeError("Price must be a number")
        .min(0, "Price cannot be negative")
        .required(),
    status: yup
        .string()
        .oneOf(["Active","Inactive"],"Choose the status"),
    description: yup
        .string()
        .optional(),
    menuItems: yup
        .array()
        .of(yup.string())
        .min(1, "You need to select at least one menu item")
        .required()
    })
export type packageValue = yup.InferType<typeof packageSchema>