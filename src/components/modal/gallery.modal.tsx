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
    useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { galleryCollectionSchema } from "@/schema/gallery.schema";
import addGalleryCollection from "@/actions/database/gallery/addGalleryCollection";
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
            formState: { errors, isSubmitting },
        } = useForm<PartialBy<GalleryCollectionType, "collectionId">>({
            resolver: yupResolver(galleryCollectionSchema)
        });

        const toast = useToast();

        const onSubmit: SubmitHandler<PartialBy<GalleryCollectionType, "collectionId">> = async (data) => {

            let response;

            if (currentCollection) {
                const collectionObject: GalleryCollectionType = {
                    ...data,
                    collectionId: currentCollection.collectionId,
                };
                response = await addGalleryCollection(collectionObject);
                setGalleryCollectionArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem !== currentCollection);
                    existingItem.push(collectionObject);
                    return existingItem;
                });
            } else {
                const collectionObject: GalleryCollectionType = {
                    ...data,
                    collectionId: uuidv4(),
                };
                response = await addGalleryCollection(collectionObject);
                setGalleryCollectionArray(prev => [...prev, collectionObject]);
            }

            onClose();
            setCurrentCollection(null);
            reset();

            toast({
                title: response.message,
                status: response.status as "success" | "error",
                duration: 9000,
                isClosable: true,
            });
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
                                isLoading={isSubmitting}
                                loadingText={currentCollection ? "Updating...": "Adding..."}
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