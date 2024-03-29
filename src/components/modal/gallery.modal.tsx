"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { featuredItemSchema } from "@/schema/featured.schema";
import { v4 as uuidv4 } from 'uuid';
import { GalleryCollectionType, PartialBy } from "@/types/types";


const ProfileGalleryModal: React.FC<{
    currentCollection: GalleryCollectionType | null,
    setCurrentCollection: Dispatch<SetStateAction<GalleryCollectionType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setGalleryCollectionArray: Dispatch<SetStateAction<GalleryCollectionType[]>>
}> = ({
    currentCollection,
    setCurrentCollection,
    isOpen,
    onClose,
    setGalleryCollectionArray,
}) => {

        const {
            handleSubmit,
            reset,
            register,
            formState: { errors },
        } = useForm<PartialBy<GalleryCollectionType, "collectionId">>({
            //resolver: yupResolver(featuredItemSchema)
        });

        const onSubmit: SubmitHandler<PartialBy<GalleryCollectionType, "collectionId">> = (data) => {
            if (currentCollection) {
                const educationObject: GalleryCollectionType = {
                    ...data,
                    collectionId: currentCollection.collectionId,
                };
                setGalleryCollectionArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem !== currentCollection);
                    existingItem.push(educationObject);
                    return existingItem;
                });
            } else {
                const educationObject: GalleryCollectionType = {
                    ...data,
                    collectionId: uuidv4(),
                };
                setGalleryCollectionArray(prev => [...prev, educationObject]);
            }

            onClose();
            setCurrentCollection(null);
            reset();
        };

        useEffect(() => {
            reset({
                name: currentCollection?.name
            });
        }, [currentCollection]);

        return (
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setCurrentCollection(null);
                }}
                closeOnOverlayClick={false}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentCollection ? "Edit" : "Add"} collection</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Collection Name:</FormLabel>
                                <Input type="text" {...register("name")} />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>
                            <Button
                                type="submit"
                                w="full"
                                mt={3}
                                colorScheme='purple'
                            >
                                {currentCollection ? "Update" : "Add"}
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    };

export default ProfileGalleryModal;