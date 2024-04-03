import * as yup from 'yup';

const skillCategorySchema = yup.object().shape({
    name: yup.string().required('Category is required').min(3, "Minimum 3 character required").max(48, "Maximum 48 characters allowed"),
});

const skillItemSchema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, "Minimum 3 character required").max(48, "Maximum 48 characters allowed"),
    icon: yup.string().defined()
});

export { skillCategorySchema, skillItemSchema };