import * as yup from 'yup';

const volunteeringItemSchema = yup.object().shape({
    role: yup.string().required("Role is required").min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    organization: yup.string().required("Organization is required").min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    purpose: yup.string().required("Purpose is required").min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    startsFrom: yup.date().required('Start date is required'),
    endsOn: yup.date().required().test({
        message: "Start date cannot be greater than end date",
        test: function (endsOn) {
            if (this.parent.isPresent) return true;
            const startsFrom = this.parent.startsFrom;
            return startsFrom < endsOn;
        }
    }),
    isPresent: yup.boolean().defined(),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
});

export { volunteeringItemSchema };