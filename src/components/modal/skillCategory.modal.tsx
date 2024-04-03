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
import { skillCategorySchema } from "@/schema/skills.schema";
import addSkillCategory from "@/actions/database/home/addSkillCategory";
import { v4 as uuidv4 } from 'uuid';
import { PartialBy, SkillCategoryType } from "@/types/types";


const ProfileSkillCategoryModal: React.FC<{
    currentCategory: SkillCategoryType | null,
    setCurrentCategory: Dispatch<SetStateAction<SkillCategoryType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setSkillCategoriesArray: Dispatch<SetStateAction<SkillCategoryType[]>>
}> = ({
    currentCategory,
    setCurrentCategory,
    isOpen,
    onClose,
    setSkillCategoriesArray
}) => {

        const {
            control,
            handleSubmit,
            reset,
            watch,
            register,
            formState: { errors, isSubmitting },
        } = useForm<PartialBy<SkillCategoryType, "categoryId">>({
            resolver: yupResolver(skillCategorySchema)
        });

        const toast = useToast();

        const onSubmit: SubmitHandler<PartialBy<SkillCategoryType, "categoryId">> = async (data) => {

            let response;

            if (currentCategory) {
                const categoryObject: SkillCategoryType = {
                    ...data,
                    categoryId: currentCategory.categoryId
                };
                response = await addSkillCategory(categoryObject);
                setSkillCategoriesArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.categoryId !== currentCategory.categoryId);
                    existingItem.push(categoryObject);
                    return existingItem;
                });
            } else {
                const categoryObject: SkillCategoryType = {
                    ...data,
                    categoryId: uuidv4()
                };
                response = await addSkillCategory(categoryObject);
                setSkillCategoriesArray(prev => [...prev, categoryObject]);
            }

            onClose();
            setCurrentCategory(null);
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
                name: currentCategory?.name
            });
        }, [currentCategory]);

        return (
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setCurrentCategory(null);
                }}
                closeOnOverlayClick={false}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentCategory ? "Edit" : "Add"} skill category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Category Name:</FormLabel>
                                <Input type="text" {...register("name")} />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>
                            <Button
                                type="submit"
                                w="full"
                                mt={3}
                                colorScheme='purple'
                                isLoading={isSubmitting}
                                loadingText={currentCategory ? "Updating...": "Adding..."}
                            >
                                {currentCategory ? "Update" : "Add"}
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

export default ProfileSkillCategoryModal;