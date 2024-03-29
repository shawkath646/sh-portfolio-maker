import * as yup from "yup";

const featuredItemSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(3, "Minimum 3 characters required").max(30, "Maximum 30 characters allowed"),
    description: yup.string().required("Description is required").min(10, "Minimum 10 characters required").max(500, "Maximum 500 characters allowed"),
    color: yup.string().required("Color is required"),
    icon: yup.string().defined()
});

export { featuredItemSchema };