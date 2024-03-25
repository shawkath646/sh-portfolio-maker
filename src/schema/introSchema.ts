import * as yup from "yup";

const introSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required").min(3, "Minimum 3 character required").max(32, "Maximum 15 character allowed"),
    description: yup.string().required("Description is required").min(5, "Minimum 5 character required").max(500, "Maximum 500 character allowed"),
    title: yup.array().required(),
    socialItems: yup.array().required(),
    introPic: yup.string(),
    quickLinks: yup.array().required()
});

export default introSchema;