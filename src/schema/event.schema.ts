import * as yup from "yup";

const eventItemSchema = yup.object().shape({
    timestamp: yup.date().required().test({
        message: "Date cannot be greater than today",
        test: function (date) {
            const today = new Date;
            return today > date;
        }
    }),
    title: yup.string().required('Title is required').min(3, "Minimum 3 character required").max(70, "Maximum 70 characters allowed"),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
});

export { eventItemSchema };