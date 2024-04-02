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
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import DateSelector from "@/components/dateSelector";
import { eventItemSchema } from "@/schema/event.schema";
import { v4 as uuidv4 } from 'uuid';
import { EventItemType } from "@/types/types";


interface EducationItemFormType {
    title: string;
    description: string;
    timestamp: Date;
}

const ProfileEventModal: React.FC<{
    currentItem: EventItemType | null,
    setCurrentItem: Dispatch<SetStateAction<EventItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setEventItemsArray: Dispatch<SetStateAction<EventItemType[]>>
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setEventItemsArray
}) => {
        const {
            control,
            handleSubmit,
            reset,
            register,
            formState: { errors },
        } = useForm<EducationItemFormType>({
            defaultValues: {
                timestamp: new Date,
            },
            resolver: yupResolver(eventItemSchema)
        });

        const onSubmit: SubmitHandler<EducationItemFormType> = (data) => {

            if (currentItem) {
                const eventObject: EventItemType = {
                    ...data,
                    id: currentItem.id,
                };
                setEventItemsArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                    existingItem.push(eventObject);
                    return existingItem;
                });
            } else {
                const eventObject: EventItemType = {
                    ...data,
                    id: uuidv4(),
                };
                setEventItemsArray(prev => [...prev, eventObject]);
            }

            onClose();
            setCurrentItem(null);
            reset();
        };

        useEffect(() => {
            reset({
                description: currentItem?.description,
                timestamp: currentItem?.timestamp as Date || new Date,
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
                    <ModalHeader>{currentItem ? "Edit" : "Add"} Life Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DateSelector
                                control={control}
                                error={errors.timestamp}
                                name="timestamp"
                                label="Happend On"
                            />
                            <FormControl isInvalid={!!errors.title}>
                                <FormLabel>Degree:</FormLabel>
                                <Input type="text" {...register("title")} />
                                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
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

export default ProfileEventModal;