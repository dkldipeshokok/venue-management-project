import * as yup from 'yup';
const customerSchema = yup.object({
    name: yup
        .string()
        .required("Please enter name"),
    organization: yup
        .string()
        .required("Please enter organization name"),
    phone: yup
        .string()
        .length(10)
        .required("Please enter phone number"),
    email: yup
        .string()
        .email()
        .required("Please  enter email"),
    status: yup
        .string()
        .required(),
}
);
export type CustomerFormValues =
  yup.InferType<typeof customerSchema>;