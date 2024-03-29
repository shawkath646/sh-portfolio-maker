"use client";
import { Dispatch, SetStateAction, useRef, useEffect } from "react";
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    FormErrorMessage,
    GridItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    Checkbox,
    SimpleGrid,
    IconButton,
    Select,
    ModalCloseButton
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { skillSchema, workExperienceItemSchema } from "@/schema/workExperience.schema";
import { v4 as uuidv4 } from 'uuid';
import { WorkExperienceItemType } from "@/types/types";
import workTypes from "@/JSONData/workTypes.json";
import workLocationTypes from "@/JSONData/workLocationTypes.json";
import { MdDelete } from "react-icons/md";

interface WorkExperienceFormType {
    companyName: string;
    role: string;
    skills: string[];
    workType: string;
    location: string;
    locationType: string;
    industry: string;
    startsFrom: Date;
    endsOn: Date;
    description: string;
    isPresent: boolean;
}

const ProfileWorkExperienceModal: React.FC<{
    currentItem: WorkExperienceItemType | null,
    setCurrentItem: Dispatch<SetStateAction<WorkExperienceItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setWorkExperienceItemsArray: Dispatch<SetStateAction<WorkExperienceItemType[]>>
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setWorkExperienceItemsArray
}) => {

    const {
        control,
        handleSubmit,
        reset,
        watch,
        setError,
        clearErrors,
        register,
        formState: { errors },
    } = useForm<WorkExperienceFormType>({
        defaultValues: {
            startsFrom: new Date,
            endsOn: new Date,
            description: "",
            skills: []
        },
        resolver: yupResolver(workExperienceItemSchema)
    });

    const onSubmit: SubmitHandler<WorkExperienceFormType> = (data) => {

        const { isPresent, ...educationData } = data;
        const endsOn = isPresent ? null : educationData.endsOn;

        if (currentItem) {
            const educationObject: WorkExperienceItemType = {
                ...educationData,
                endsOn: endsOn,
                id: currentItem.id,
            };
            setWorkExperienceItemsArray(prev => {
                const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                existingItem.push(educationObject);
                return existingItem;
            });
        } else {
            const educationObject: WorkExperienceItemType = {
                ...educationData,
                endsOn: endsOn,
                id: uuidv4(),
            };
            setWorkExperienceItemsArray(prev => [...prev, educationObject]);
        }

        onClose();
        setCurrentItem(null);
        reset();
    };

    useEffect(() => {
        reset({
            companyName: currentItem?.companyName,
            description: currentItem?.description,
            endsOn: currentItem?.endsOn as Date || new Date,
            industry: currentItem?.industry,
            isPresent: currentItem?.endsOn ? false : true,
            location: currentItem?.location,
            locationType: currentItem?.locationType,
            role: currentItem?.role,
            skills: currentItem?.skills || [],
            startsFrom: currentItem?.startsFrom as Date || new Date,
            workType: currentItem?.workType
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
                <ModalHeader>{currentItem ? "Edit" : "Add"} work experience</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.role}>
                            <FormLabel fontSize="sm">Role:</FormLabel>
                            <Input type="text" {...register("role")} size="sm" />
                            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.companyName}>
                            <FormLabel fontSize="sm">Company:</FormLabel>
                            <Input type="text" {...register("companyName")} size="sm" />
                            <FormErrorMessage>{errors.companyName?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.industry}>
                            <FormLabel fontSize="sm">Industry:</FormLabel>
                            <Input type="text" {...register("industry")} size="sm" />
                            <FormErrorMessage>{errors.industry?.message}</FormErrorMessage>
                        </FormControl>
                        <SimpleGrid columns={2} gap={2}>
                            <GridItem as={FormControl} isInvalid={!!errors.workType}>
                                <FormLabel fontSize="sm">Work Type:</FormLabel>
                                <Select {...register("workType")} placeholder="Select type">
                                    {workTypes.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.workType?.message}</FormErrorMessage>
                            </GridItem>
                            <GridItem as={FormControl} isInvalid={!!errors.locationType}>
                                <FormLabel fontSize="sm">Location Type:</FormLabel>
                                <Select {...register("locationType")} placeholder="Select type">
                                    {workLocationTypes.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </Select>
                                <FormErrorMessage>{errors.locationType?.message}</FormErrorMessage>
                            </GridItem>
                        </SimpleGrid>
                        <FormControl isInvalid={!!errors.location}>
                            <FormLabel fontSize="sm">Loaction:</FormLabel>
                            <Input type="text" {...register("location")} size="sm" />
                            <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
                        </FormControl>
                        <Controller
                            name="skills"
                            control={control}
                            render={({ field }) => {
                                const skillRef = useRef<HTMLInputElement | null>(null);
                                return (
                                    <FormControl isInvalid={!!errors.skills}>
                                        <FormLabel fontSize="sm">Skills:</FormLabel>
                                        {field.value.length ? field.value.map((item, index) => (
                                            <Flex
                                                key={index}
                                                py={1}
                                                px={2}
                                                justifyContent="space-between"
                                                alignItems="center"
                                                bgColor="#f1f5f9"
                                                rounded="md"
                                                mb={2}
                                            >
                                                <Text fontSize="sm" isTruncated>{item}</Text>
                                                <IconButton
                                                    icon={<MdDelete size={20} />}
                                                    aria-label="Add title"
                                                    variant="none"
                                                    h={6}
                                                    w={6}
                                                    color="#f43f5e"
                                                    _hover={{
                                                        color: "#e11d48",
                                                        transition: "color 0.3s ease",
                                                    }}
                                                    onClick={() => {
                                                        const filteredValue = field.value.filter(title => title !== item);
                                                        field.onChange(filteredValue);
                                                    }}
                                                />
                                            </Flex>
                                        )) : (
                                            <Text fontSize="sm" color="#64748b">No skills added</Text>
                                        )}

                                        <Flex alignItems="center" gap={2}>
                                            <Input type="text" ref={skillRef} size="sm" />
                                            <Button
                                                size="sm"
                                                onClick={async () => {
                                                    if (skillRef.current) {
                                                        const skillValue = skillRef.current.value;
                                                        clearErrors("skills")
                                                        if (field.value.includes(skillValue)) {
                                                            setError("skills", { message: "Item already exists" });
                                                            return;
                                                        }
                                                        if (field.value.length >= 15) {
                                                            setError("skills", { message: "Maximum item 15 reached" });
                                                            return;
                                                        }
                                                        try {
                                                            await skillSchema.validate(skillValue);
                                                            field.onChange([...field.value, skillValue]);
                                                            skillRef.current.value = "";
                                                        } catch (error: any) {
                                                            setError("skills", { message: error.message });
                                                        }
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Flex>
                                        <FormErrorMessage>{errors.skills?.message}</FormErrorMessage>
                                    </FormControl>
                                )
                            }}
                        />
                        <SimpleGrid columns={2} gap={2} my={2}>
                            <GridItem as={FormControl} isInvalid={!!errors.startsFrom} fontSize="sm">
                                <FormLabel fontSize="sm">Starts From:</FormLabel>
                                <Controller
                                    name="startsFrom"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="date"
                                            value={field.value.toISOString().split('T')[0]}
                                            onChange={event => field.onChange(new Date(event.target.value))}
                                            size="sm"
                                        />
                                    )}
                                />
                                <FormErrorMessage>{errors.startsFrom?.message}</FormErrorMessage>
                            </GridItem>
                            {!watch("isPresent") && (
                                <GridItem as={FormControl} isInvalid={!!errors.endsOn} fontSize="sm">
                                    <FormLabel fontSize="sm">Ends On:</FormLabel>
                                    <Controller
                                        name="endsOn"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="date"
                                                value={field.value.toISOString().split('T')[0]}
                                                onChange={event => field.onChange(new Date(event.target.value))}
                                                size="sm"
                                            />
                                        )}
                                    />
                                    <FormErrorMessage>{errors.endsOn?.message}</FormErrorMessage>
                                </GridItem>
                            )}
                        </SimpleGrid>
                        <Checkbox mb={2} {...register("isPresent")}>Present</Checkbox>
                        <FormControl isInvalid={!!errors.description}>
                            <FormLabel fontSize="sm">Description:</FormLabel>
                            <Textarea {...register("description")} resize="none" size="sm" />
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
};

export default ProfileWorkExperienceModal;