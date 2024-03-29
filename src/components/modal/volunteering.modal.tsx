"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    GridItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Textarea,
    Checkbox,
    SimpleGrid,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { volunteeringItemSchema } from "@/schema/volunteering.schema";
import { v4 as uuidv4 } from 'uuid';
import { VolunteeringItemType } from "@/types/types";

interface VolunteeringItemFormType {
    organization: string;
    role: string;
    purpose: string;
    startsFrom: Date;
    endsOn: Date;
    description: string;
    isPresent: boolean;
}

const ProfileVolunteeringModal: React.FC<{
    currentItem: VolunteeringItemType | null,
    setCurrentItem: Dispatch<SetStateAction<VolunteeringItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setEducationItemsArray: Dispatch<SetStateAction<VolunteeringItemType[]>>
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setEducationItemsArray
}) => {
    const {
        control,
        handleSubmit,
        reset,
        watch,
        register,
        formState: { errors },
    } = useForm<VolunteeringItemFormType>({
        defaultValues: {
            startsFrom: new Date,
            endsOn: new Date,
        },
        resolver: yupResolver(volunteeringItemSchema)
    });

    const onSubmit: SubmitHandler<VolunteeringItemFormType> = (data) => {

        const { isPresent, ...volunteeringData } = data;
        const endsOn = isPresent ? null : volunteeringData.endsOn;

        if (currentItem) {
            const volunteeringObject: VolunteeringItemType = {
                ...volunteeringData,
                endsOn: endsOn,
                id: currentItem.id,
            };
            setEducationItemsArray(prev => {
                const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                existingItem.push(volunteeringObject);
                return existingItem;
            });
        } else {
            const volunteeringObject: VolunteeringItemType = {
                ...volunteeringData,
                endsOn: endsOn,
                id: uuidv4(),
            };
            setEducationItemsArray(prev => [...prev, volunteeringObject]);
        }

        onClose();
        setCurrentItem(null);
        reset();
    };

    useEffect(() => {
        reset({
            description: currentItem?.description,
            endsOn: currentItem?.endsOn as Date || new Date,
            isPresent: currentItem?.endsOn ? false : true,
            organization: currentItem?.organization,
            purpose: currentItem?.purpose,
            role: currentItem?.role,
            startsFrom: currentItem?.startsFrom as Date || new Date
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
                <ModalHeader>{currentItem ? "Edit" : "Add"} volunteering</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.role}>
                            <FormLabel>Role:</FormLabel>
                            <Input type="text" {...register("role")} />
                            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.organization}>
                            <FormLabel>Organization:</FormLabel>
                            <Input type="text" {...register("organization")} />
                            <FormErrorMessage>{errors.organization?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.purpose}>
                            <FormLabel>Purpose:</FormLabel>
                            <Input type="text" {...register("purpose")} />
                            <FormErrorMessage>{errors.purpose?.message}</FormErrorMessage>
                        </FormControl>
                        <SimpleGrid columns={2} gap={2} my={2}>
                            <GridItem as={FormControl} isInvalid={!!errors.startsFrom}>
                                <FormLabel>Starts From:</FormLabel>
                                <Controller
                                    name="startsFrom"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="date"
                                            value={field.value.toISOString().split('T')[0]}
                                            onChange={event => field.onChange(new Date(event.target.value))}
                                        />
                                    )}
                                />
                                <FormErrorMessage>{errors.startsFrom?.message}</FormErrorMessage>
                            </GridItem>
                            {!watch("isPresent") && (
                                <GridItem as={FormControl} isInvalid={!!errors.endsOn}>
                                    <FormLabel>Ends On:</FormLabel>
                                    <Controller
                                        name="endsOn"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="date"
                                                value={field.value.toISOString().split('T')[0]}
                                                onChange={event => field.onChange(new Date(event.target.value))}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>{errors.endsOn?.message}</FormErrorMessage>
                                </GridItem>
                            )}
                        </SimpleGrid>
                        <Checkbox mb={2} {...register("isPresent")}>Present</Checkbox>
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

export default ProfileVolunteeringModal;