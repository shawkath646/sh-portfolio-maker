import * as yup from 'yup';

const galleryCollectionSchema = yup.object().shape({
    name: yup.string().required('Collection is required').min(3, "Minimum 3 character required").max(48, "Maximum 48 characters allowed"),
});

export { galleryCollectionSchema };