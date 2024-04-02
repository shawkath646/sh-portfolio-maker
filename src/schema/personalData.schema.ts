import * as yup from "yup";

const personalDataSchema = yup.object().shape({
    dateOfBirth: yup.date()
    .defined()
    .test('is-at-least-13-years-old', 'Date of birth must be at least 13 years old', function (value) {
        if (this.parent.isDateOfBirthHidden) return true;
        const minAgeDate = new Date();
        minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
        return value && value <= minAgeDate;
    }),
    interestedIn: yup.array().defined().max(25, "Maximum item 25 reached"),
    languages: yup.array().defined().max(25, "Maximum item 25 reached"),
    presentAddressLine1: yup.string().defined().min(3, "Minimum 3 characters required"),
    presentAddressLine2: yup.string().defined(),
    permanentAddressLine1: yup.string().defined().min(3, "Minimum 3 characters required"),
    permanentAddressLine2: yup.string().defined(),
    maritalStatus: yup.string().defined(),
    isDateOfBirthHidden: yup.boolean().defined(),
});

export { personalDataSchema };