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
    Checkbox,
    SimpleGrid,
    useBoolean,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import DateSelector from "@/components/dateSelector";
import { volunteeringItemSchema } from "@/schema/volunteering.schema";
import addVolunteeringItem from "@/actions/database/portfolio/addVolunteeringItem";
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

        const [isLoading, setLoading] = useBoolean(false);

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


        const onSubmit: SubmitHandler<VolunteeringItemFormType> = async (data) => {

            setLoading.on();
            const { isPresent, ...volunteeringData } = data;
            const endsOn = isPresent ? null : volunteeringData.endsOn;

            if (currentItem) {
                const volunteeringObject: VolunteeringItemType = {
                    ...volunteeringData,
                    endsOn: endsOn,
                    id: currentItem.id,
                };
                await addVolunteeringItem(volunteeringObject);
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
                await addVolunteeringItem(volunteeringObject);
                setEducationItemsArray(prev => [...prev, volunteeringObject]);
            }

            onClose();
            setCurrentItem(null);
            reset();
            setLoading.off();
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
                                <DateSelector
                                    control={control}
                                    error={errors.startsFrom}
                                    name="startsFrom"
                                    label="Starts From"
                                />
                                {!watch("isPresent") && (
                                    <DateSelector
                                        control={control}
                                        error={errors.endsOn}
                                        name="endsOn"
                                        label="Ends On"
                                    />
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
                                isLoading={isLoading}
                                loadingText={currentItem ? "Updating..." : "Adding..."}
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