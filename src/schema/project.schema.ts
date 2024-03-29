import * as yup from "yup";

const projectSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    type: yup.string().required("Type is required").min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    icon: yup.string().defined(),
    coverImage: yup.string().defined(),
    liveLink: yup.string().defined().url("Invalid URL detected"),
    sourceLink: yup.string().defined().url("Invalid URL detected"),
    startsFrom: yup.date().required('Start date is required'),
    endsOn: yup.date().required().test({
        message: "Start date cannot be greater than end date",
        test: function (endsOn) {
            if (this.parent.isPresent) return true;
            const startsFrom = this.parent.startsFrom;
            return startsFrom < endsOn;
        }
    }),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
    isPresent: yup.boolean().defined()
});

export { projectSchema };