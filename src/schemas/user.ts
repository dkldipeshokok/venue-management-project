import * as yup from "yup";

export const userSchema = yup.object({
    id: yup
        .string()
        .optional(),

    name: yup
        .string()
        .required(),

    email: yup
        .string()
        .email("Enter a valid email")
        .required(),

    phone: yup
        .string()
        .length(10, "Phone number must be 10 digits")
        .required(),

    role: yup
        .string()
        .oneOf( ["SuperAdmin", "Customer", "Employee"], "Choose a valid role")
        .required(),

    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required(),

    Cpassword: yup
        .string()
        .oneOf( [yup.ref("password")], "Password must match")
        .required(),

    createdAt: yup
        .string()
        .optional(),
    status: yup
        .string()                
        .oneOf(["Active","Inactive"],"Choose the status")
        .required(),
});

export type UserValues = yup.InferType<typeof userSchema>;