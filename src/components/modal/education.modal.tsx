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
    Select,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { educationItemSchema } from "@/schema/education.schema";
import { v4 as uuidv4 } from 'uuid';
import { EducationItemType } from "@/types/types";
import educationTypes from "@/JSONData/educationTypes.json";

interface EducationItemFormType {
    degree: string;
    field: string;
    grade: string;
    institute: string;
    startsFrom: Date;
    endsOn: Date;
    type: string;
    description: string;
    isPresent: boolean;
}

const ProfileEducationModal: React.FC<{
    currentItem: EducationItemType | null,
    setCurrentItem: Dispatch<SetStateAction<EducationItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setEducationItemsArray: Dispatch<SetStateAction<EducationItemType[]>>
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
    } = useForm<EducationItemFormType>({
        defaultValues: {
            startsFrom: new Date,
            endsOn: new Date,
        },
        resolver: yupResolver(educationItemSchema)
    });

    const onSubmit: SubmitHandler<EducationItemFormType> = (data) => {

        const { isPresent, ...educationData } = data;
        const endsOn = isPresent ? null : educationData.endsOn;

        if (currentItem) {
            const educationObject: EducationItemType = {
                ...educationData,
                endsOn: endsOn,
                id: currentItem.id,
            };
            setEducationItemsArray(prev => {
                const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                existingItem.push(educationObject);
                return existingItem;
            });
        } else {
            const educationObject: EducationItemType = {
                ...educationData,
                endsOn: endsOn,
                id: uuidv4(),
            };
            setEducationItemsArray(prev => [...prev, educationObject]);
        }

        onClose();
        setCurrentItem(null);
        reset();
    };

    useEffect(() => {
        reset({
            type: currentItem?.type,
            startsFrom: currentItem?.startsFrom as Date || new Date,
            endsOn: currentItem?.endsOn as Date || new Date,
            description: currentItem?.description,
            degree: currentItem?.degree,
            field: currentItem?.field,
            grade: currentItem?.grade,
            institute: currentItem?.institute,
            isPresent: currentItem?.endsOn ? false : true
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
                <ModalHeader>{currentItem ? "Edit" : "Add"} education</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.degree}>
                            <FormLabel>Degree:</FormLabel>
                            <Input type="text" {...register("degree")} />
                            <FormErrorMessage>{errors.degree?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.institute}>
                            <FormLabel>Institute:</FormLabel>
                            <Input type="text" {...register("institute")} />
                            <FormErrorMessage>{errors.institute?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.type}>
                            <FormLabel>Type:</FormLabel>
                            <Select {...register("type")} placeholder="Select type">
                                {educationTypes.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </Select>
                            <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.field}>
                            <FormLabel>Field of study:</FormLabel>
                            <Input type="text" {...register("field")} />
                            <FormErrorMessage>{errors.field?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.grade}>
                            <FormLabel>Grade:</FormLabel>
                            <Input type="text" {...register("grade")} />
                            <FormErrorMessage>{errors.grade?.message}</FormErrorMessage>
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

export default ProfileEducationModal;