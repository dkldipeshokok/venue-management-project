import * as yup from 'yup';

export const customerSchema = yup.object({
    id: yup
        .string()
        .optional(),
    name: yup
        .string()
        .required(),
    organization: yup
        .string()
        .required(),
    phone: yup
        .string()
        .length(10,"The length must be 10 digits")
        .required(),
    email: yup
        .string()
        .email("Enter valid email")
        .required(),
    status: yup
        .string()
        .oneOf(["Active","Inactive"],"Choose the status")
        .required(),
}
);
export type CustomerValues =
  yup.InferType<typeof customerSchema>;