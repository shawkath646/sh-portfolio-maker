import * as yup from 'yup';

const currentDate = new Date();

currentDate.setHours(23);
currentDate.setMinutes(59);
currentDate.setSeconds(0);
currentDate.setMilliseconds(0);

const skillSchema = yup.string().required().min(3, 'Minimum 3 characters required').max(32, 'Maximum 32 characters allowed');

const workExperienceItemSchema = yup.object().shape({
    role: yup.string().required('Degree is required').min(3, "Minimum 3 characters required").max(70, "Maximum 70 characters allowed"),
    industry: yup.string().required('Field is required').min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    companyName: yup.string().required('Field is required').min(3, "Minimum 3 characters required").max(48, "Maximum 48 characters allowed"),
    workType: yup.string().required("Work type is required"),
    location: yup.string().required('Institute is required').min(3, "Minimum 3 characters required").max(100, "Maximum 100 characters allowed"),
    locationType: yup.string().required("Location type is required"),
    startsFrom: yup.date().required('Start date is required').max(currentDate, 'Start date cannot be greater than today'),
    endsOn: yup.date().required().test({
        message: "Start date cannot be greater than end date",
        test: function (endsOn) {
            if (this.parent.isPresent) return true;
            const startsFrom = this.parent.startsFrom;
            return startsFrom < endsOn;
        }
    }),
    description: yup.string().defined().max(600, "Maximum 600 characters allowed"),
    isPresent: yup.boolean().defined(),
    skills: yup.array().defined().of(
        skillSchema
    ).max(15, 'Maximum item 15 reached')
});


export { workExperienceItemSchema, skillSchema };