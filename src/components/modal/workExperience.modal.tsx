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
    ModalCloseButton,
    useBoolean
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import DateSelector from "@/components/dateSelector";
import { skillSchema, workExperienceItemSchema } from "@/schema/workExperience.schema";
import addWorkExperienceItem from "@/actions/database/portfolio/addWorkExperienceItem";
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

        const [isLoading, setLoading] = useBoolean(false);

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

        const onSubmit: SubmitHandler<WorkExperienceFormType> = async (data) => {

            setLoading.on();
            const { isPresent, ...workExperienceData } = data;
            const endsOn = isPresent ? null : workExperienceData.endsOn;

            if (currentItem) {
                const workExperienceObject: WorkExperienceItemType = {
                    ...workExperienceData,
                    endsOn: endsOn,
                    id: currentItem.id,
                };
                await addWorkExperienceItem(workExperienceObject);
                setWorkExperienceItemsArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                    existingItem.push(workExperienceObject);
                    return existingItem;
                });
            } else {
                const workExperienceObject: WorkExperienceItemType = {
                    ...workExperienceData,
                    endsOn: endsOn,
                    id: uuidv4(),
                };
                await addWorkExperienceItem(workExperienceObject);
                setWorkExperienceItemsArray(prev => [...prev, workExperienceObject]);
            }

            onClose();
            setCurrentItem(null);
            reset();
            setLoading.off();
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
                                <FormLabel>Role:</FormLabel>
                                <Input type="text" {...register("role")} />
                                <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.companyName}>
                                <FormLabel>Company:</FormLabel>
                                <Input type="text" {...register("companyName")} />
                                <FormErrorMessage>{errors.companyName?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.industry}>
                                <FormLabel>Industry:</FormLabel>
                                <Input type="text" {...register("industry")} />
                                <FormErrorMessage>{errors.industry?.message}</FormErrorMessage>
                            </FormControl>
                            <SimpleGrid columns={2} gap={2}>
                                <GridItem as={FormControl} isInvalid={!!errors.workType}>
                                    <FormLabel>Work Type:</FormLabel>
                                    <Select {...register("workType")} placeholder="Select type">
                                        {workTypes.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.workType?.message}</FormErrorMessage>
                                </GridItem>
                                <GridItem as={FormControl} isInvalid={!!errors.locationType}>
                                    <FormLabel>Location Type:</FormLabel>
                                    <Select {...register("locationType")} placeholder="Select type">
                                        {workLocationTypes.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.locationType?.message}</FormErrorMessage>
                                </GridItem>
                            </SimpleGrid>
                            <FormControl isInvalid={!!errors.location}>
                                <FormLabel>Loaction:</FormLabel>
                                <Input type="text" {...register("location")} />
                                <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
                            </FormControl>
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => {
                                    const skillRef = useRef<HTMLInputElement | null>(null);
                                    return (
                                        <FormControl isInvalid={!!errors.skills}>
                                            <FormLabel>Skills:</FormLabel>
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
                                                    <Text isTruncated>{item}</Text>
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
                                                <Text color="#64748b">No skills added</Text>
                                            )}

                                            <Flex alignItems="center" gap={2}>
                                                <Input type="text" ref={skillRef} />
                                                <Button
                                                   
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
    };

export default ProfileWorkExperienceModal;