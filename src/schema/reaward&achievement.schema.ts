import * as yup from "yup";

const currentDate = new Date();

currentDate.setHours(23);
currentDate.setMinutes(59);
currentDate.setSeconds(0);
currentDate.setMilliseconds(0);

const reawardAndAchievementSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    issuedBy: yup.string().required("Organization is required").min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    issuedOn: yup
        .date()
        .required('Issued date is required')
        .max(currentDate, "Issued date can't be a future date"),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
});

export { reawardAndAchievementSchema };