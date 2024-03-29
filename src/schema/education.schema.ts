import * as yup from 'yup';

const educationItemSchema = yup.object().shape({
    degree: yup.string().required('Degree is required').min(3, "Minimum 3 character required").max(70, "Maximum 70 characters allowed"),
    field: yup.string().required('Field is required').min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    grade: yup.string().required('Grade is required').min(3, "Minimum 3 characters required").max(32, "Maximum 32 characters allowed"),
    institute: yup.string().required('Institute is required').min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    startsFrom: yup.date().required('Start date is required'),
    endsOn: yup.date().required().test({
        message: "Start date cannot be greater than end date",
        test: function (endsOn) {
            if (this.parent.isPresent) return true;
            const startsFrom = this.parent.startsFrom;
            return startsFrom < endsOn;
        }
    }),
    type: yup.string().required("Type is required"),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
    isPresent: yup.boolean().defined()
});



export { educationItemSchema };