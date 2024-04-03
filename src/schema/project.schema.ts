import * as yup from "yup";

const currentDate = new Date();

currentDate.setHours(23);
currentDate.setMinutes(59);
currentDate.setSeconds(0);
currentDate.setMilliseconds(0);

const projectSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    type: yup.string().required("Type is required").min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    icon: yup.string().defined(),
    coverImage: yup.string().defined(),
    liveLink: yup.string().defined().url("Invalid URL detected"),
    sourceLink: yup.string().defined().url("Invalid URL detected"),
    startsFrom: yup.date().required('Start date is required').max(currentDate, 'Start date cannot be greater than today'),
    endsOn: yup.date().required().test({
        message: "Start date cannot be greater than end date",
        test: function (endsOn) {
            if (this.parent.isPresent) return true;
            const startsFrom = this.parent.startsFrom;
            return startsFrom < endsOn;
        }
    }),
    description: yup.string().defined(),
    isPresent: yup.boolean().defined()
});

export { projectSchema };