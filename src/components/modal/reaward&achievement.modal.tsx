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
    Textarea,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { reawardAndAchievementSchema } from "@/schema/reaward&achievement.schema";
import { v4 as uuidv4 } from 'uuid';
import { ReawardAndAchievementItemType } from "@/types/types";

interface ReawardAndAchievementItemFormType {
    title: string;
    issuedBy: string;
    issuedOn: Date;
    description: string;
}

const ProfileReawardAndAchievementModal: React.FC<{
    currentItem: ReawardAndAchievementItemType | null,
    setCurrentItem: Dispatch<SetStateAction<ReawardAndAchievementItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setReawardAndAchievementArray: Dispatch<SetStateAction<ReawardAndAchievementItemType[]>>
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setReawardAndAchievementArray
}) => {
        const {
            control,
            handleSubmit,
            reset,
            register,
            formState: { errors },
        } = useForm<ReawardAndAchievementItemFormType>({
            defaultValues: {
                issuedOn: new Date,
            },
            resolver: yupResolver(reawardAndAchievementSchema)
        });

        const onSubmit: SubmitHandler<ReawardAndAchievementItemFormType> = (data) => {
            if (currentItem) {
                const reawardAndAchievementObject: ReawardAndAchievementItemType = {
                    ...data,
                    id: currentItem.id,
                };
                setReawardAndAchievementArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                    existingItem.push(reawardAndAchievementObject);
                    return existingItem;
                });
            } else {
                const reawardAndAchievementObject: ReawardAndAchievementItemType = {
                    ...data,
                    id: uuidv4(),
                };
                setReawardAndAchievementArray(prev => [...prev, reawardAndAchievementObject]);
            }

            onClose();
            setCurrentItem(null);
            reset();
        };

        useEffect(() => {
            reset({
                description: currentItem?.description || "",
                issuedBy: currentItem?.issuedBy || "",
                issuedOn: currentItem?.issuedOn as Date || new Date,
                title: currentItem?.title || ""
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
                    <ModalHeader>{currentItem ? "Edit" : "Add"} reaward & achievement</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.title}>
                                <FormLabel>Title:</FormLabel>
                                <Input type="text" {...register("title")} />
                                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.issuedBy}>
                                <FormLabel>Issued By:</FormLabel>
                                <Input type="text" {...register("issuedBy")} />
                                <FormErrorMessage>{errors.issuedBy?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.issuedOn}>
                                <FormLabel>Issued On:</FormLabel>
                                <Controller
                                    name="issuedOn"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="date"
                                            value={field.value.toISOString().split('T')[0]}
                                            onChange={event => field.onChange(new Date(event.target.value))}
                                        />
                                    )}
                                />
                                <FormErrorMessage>{errors.issuedOn?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.description}>
                                <FormLabel>Description:</FormLabel>
                                <Textarea {...register("description")} resize="none" />
                                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                            </FormControl>
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
    }

export default ProfileReawardAndAchievementModal;