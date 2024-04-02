import * as yup from "yup";

const introSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required").min(3, "Minimum 3 characters required").max(32, "Maximum 32 characters allowed"),
    description: yup.string().required("Description is required").min(5, "Minimum 5 characters required").max(600, "Maximum 600 characters allowed"),
    title: yup.array().defined().max(10, "Maximum item 10 reached"),
    socialItems: yup.array().defined().max(10, "Maximum item 10 reached"),
    introPic: yup.string().defined(),
    quickLinks: yup.array().defined().max(10, "Maximum item 10 reached")
});

const quickLinkSchema = yup.object().shape({
    name: yup.string()
        .required("Name is required")
        .min(3, "Minimum 3 character required")
        .max(15, "Maximum 15 character allowed"),
    href: yup.string().url("Invalid URL detected").required("URL is required"),
    color: yup.string().required("Button color is required")
});


export { introSchema, quickLinkSchema };