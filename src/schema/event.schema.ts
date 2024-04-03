import * as yup from "yup";

const currentDate = new Date();

currentDate.setHours(23);
currentDate.setMinutes(59);
currentDate.setSeconds(0);
currentDate.setMilliseconds(0);

const eventItemSchema = yup.object().shape({
    timestamp: yup.date().required("Timestamp is required").max(currentDate, 'Start date cannot be greater than today'),
    title: yup.string().required('Title is required').min(3, "Minimum 3 character required").max(70, "Maximum 70 characters allowed"),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
});

export { eventItemSchema };