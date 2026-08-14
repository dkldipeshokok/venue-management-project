import * as yup from 'yup';
export const customerSchema = yup.object({
    name: yup
        .string()
        .required("Please enter name"),
    organization: yup
        .string()
        .required("Please enter organization name"),
    phone: yup
        .string()
        .length(10,"The length must be 10 digits")
        .required("Please enter phone number"),
    email: yup
        .string()
        .email("Enter valid email")
        .required("Please  enter email"),
}
);
export type CustomerFormValues =
  yup.InferType<typeof customerSchema>;