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
import { skillItemSchema } from "@/schema/skills.schema";
import addSkillItem from "@/actions/database/home/addSkillItem";
import { v4 as uuidv4 } from 'uuid';
import { PartialBy, SkillItemType } from "@/types/types";
import ImageSelector from "../imageSelector";



const ProfileSkillModal: React.FC<{
    currentItem: SkillItemType | null,
    setCurrentItem: Dispatch<SetStateAction<SkillItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setSkillItemsArray: Dispatch<SetStateAction<SkillItemType[]>>;
    categoryId: string;
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setSkillItemsArray,
    categoryId
}) => {

        const {
            control,
            handleSubmit,
            reset,
            register,
            clearErrors,
            setError,
            formState: { errors, isSubmitting },
        } = useForm<PartialBy<PartialBy<SkillItemType, "id">, "categoryId">>({
            resolver: yupResolver(skillItemSchema)
        });

        const toast = useToast();

        const onSubmit: SubmitHandler<PartialBy<PartialBy<SkillItemType, "id">, "categoryId">> = async (data) => {

            let response;

            if (currentItem) {
                const skillObject: SkillItemType = {
                    ...data,
                    categoryId: currentItem.categoryId,
                    id: currentItem.id,
                };
                response = await addSkillItem(skillObject);
                setSkillItemsArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                    existingItem.push(skillObject);
                    return existingItem;
                });
            } else {
                const skillObject: SkillItemType = {
                    ...data,
                    categoryId,
                    id: uuidv4(),
                };
                response = await addSkillItem(skillObject);
                setSkillItemsArray(prev => [...prev, skillObject]);
            }

            onClose();
            setCurrentItem(null);
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
                name: currentItem?.name,
                icon: currentItem?.icon
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
                    <ModalHeader>{currentItem ? "Edit" : "Add"} skill item</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Name:</FormLabel>
                                <Input type="text" {...register("name")} />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>
                            <ImageSelector
                                clearErrors={clearErrors}
                                control={control}
                                error={errors.icon}
                                name="icon"
                                setError={setError}
                                label="Icon"
                            />
                            <Button
                                type="submit"
                                w="full"
                                mt={3}
                                colorScheme='purple'
                                isLoading={isSubmitting}
                                loadingText={currentItem ? "Updating...": "Adding..."}
                            >
                                {currentItem ? "Update" : "Add"}
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

export default ProfileSkillModal;