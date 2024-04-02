"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Select,
    useToast
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ImageSelector from "@/components/imageSelector";
import { featuredItemSchema } from "@/schema/featured.schema";
import { v4 as uuidv4 } from 'uuid';
import { FeaturedItemType, PartialBy } from "@/types/types";
import cardColors from "@/JSONData/cardColors.json";
import updateFeaturedItem from "@/actions/database/home/addFeaturedItem";


const ProfileFeaturedModal: React.FC<{
    currentItem: FeaturedItemType | null,
    setCurrentItem: Dispatch<SetStateAction<FeaturedItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setFeaturedItemsArray: Dispatch<SetStateAction<FeaturedItemType[]>>
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setFeaturedItemsArray
}) => {

        const {
            control,
            clearErrors,
            handleSubmit,
            reset,
            setError,
            register,
            formState: { errors },
        } = useForm<PartialBy<FeaturedItemType, "id">>({
            resolver: yupResolver(featuredItemSchema)
        });

        const toast = useToast();

        const onSubmit: SubmitHandler<PartialBy<FeaturedItemType, "id">> = async(data) => {
            const response = async() => {
                if (currentItem) {
                    const featuredObject: FeaturedItemType = {
                        ...data,
                        id: currentItem.id,
                    };
                    await updateFeaturedItem(featuredObject);
                    setFeaturedItemsArray(prev => {
                        const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                        existingItem.push(featuredObject);
                        return existingItem;
                    });
                } else {
                    const featuredObject: FeaturedItemType = {
                        ...data,
                        id: uuidv4(),
                    };
                    await updateFeaturedItem(featuredObject);
                    setFeaturedItemsArray(prev => [...prev, featuredObject]);
                }
    
                onClose();
                setCurrentItem(null);
                reset();
            }

            toast.promise(response(), {
                success: { title: 'Featured item added successfully' },
                error: { title: 'Something wrong', },
                loading: { title: 'Adding featured item...' },
            });
        };

        useEffect(() => {
            reset({
                color: currentItem?.color,
                description: currentItem?.description,
                icon: currentItem?.icon,
                title: currentItem?.title
            });
        }, [currentItem]);

        return (
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setCurrentItem(null);
                }}
                closeOnOverlayClick={false}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentItem ? "Edit" : "Add"} featured</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.title}>
                                <FormLabel>Title:</FormLabel>
                                <Input type="text" {...register("title")} />
                                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel>Description:</FormLabel>
                                <Textarea {...register("description")} resize="none" />
                                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                            </FormControl>
                            <Flex gap={4}>
                                <Box as={FormControl} isInvalid={!!errors.color}>
                                    <FormLabel>Color:</FormLabel>
                                    <Select {...register("color")} placeholder="Select color">
                                        {cardColors.map((color, index) => (
                                            <option key={index} value={color.hex}>{color.name}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.color?.message}</FormErrorMessage>
                                </Box>
                                <ImageSelector
                                    clearErrors={clearErrors}
                                    control={control}
                                    error={errors.icon}
                                    name="icon"
                                    setError={setError}
                                    label="Icon"
                                />
                            </Flex>
                            <Button
                                type="submit"
                                w="full"
                                mt={3}
                                colorScheme='purple'
                            >
                                {currentItem ? "Update" : "Add"}
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    };

export default ProfileFeaturedModal;