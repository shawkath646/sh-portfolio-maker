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
    Checkbox,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ImageSelector from "@/components/imageSelector";
import FileSelector from "@/components/fileSelector";
import DateSelector from "@/components/dateSelector";
import { projectSchema } from "@/schema/project.schema";
import { v4 as uuidv4 } from 'uuid';
import { ProjectItemType } from "@/types/types";
import AddProjectItem from "@/actions/database/projects/addProjectItem";



interface ProjectItemFormType {
    name: string;
    description: string;
    icon: string;
    liveLink: string;
    sourceLink: string;
    type: string;
    startsFrom: Date;
    endsOn: Date;
    coverImage: string;
    isPresent: boolean;
}

const ProfileProjectModal: React.FC<{
    currentItem: ProjectItemType | null,
    setCurrentItem: Dispatch<SetStateAction<ProjectItemType | null>>,
    isOpen: boolean,
    onClose: () => void,
    setProjectItemsArray: Dispatch<SetStateAction<ProjectItemType[]>>
}> = ({
    currentItem,
    setCurrentItem,
    isOpen,
    onClose,
    setProjectItemsArray
}) => {

        const {
            control,
            handleSubmit,
            reset,
            watch,
            register,
            clearErrors,
            setError,
            formState: { errors, isSubmitting },
        } = useForm<ProjectItemFormType>({
            defaultValues: {
                startsFrom: new Date,
                endsOn: new Date,
            },
            resolver: yupResolver(projectSchema)
        });

        const toast = useToast();

        const onSubmit: SubmitHandler<ProjectItemFormType> = async (data) => {

            let response;

            const { isPresent, ...projectData } = data;
            const endsOn = isPresent ? null : projectData.endsOn;

            if (currentItem) {
                const projectObject: ProjectItemType = {
                    ...projectData,
                    endsOn: endsOn,
                    id: currentItem.id,
                };
                response = await AddProjectItem(projectObject);
                setProjectItemsArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                    existingItem.push(projectObject);
                    return existingItem;
                });
            } else {
                const projectObject: ProjectItemType = {
                    ...projectData,
                    endsOn: endsOn,
                    id: uuidv4(),
                };
                response = await AddProjectItem(projectObject);
                setProjectItemsArray(prev => [...prev, projectObject]);
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
                coverImage: currentItem?.coverImage,
                description: currentItem?.description,
                endsOn: currentItem?.endsOn as Date || new Date,
                icon: currentItem?.icon,
                isPresent: currentItem?.endsOn ? false : true,
                liveLink: currentItem?.liveLink,
                name: currentItem?.name,
                sourceLink: currentItem?.sourceLink,
                startsFrom: currentItem?.startsFrom as Date || new Date,
                type: currentItem?.type
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
                    <ModalHeader>{currentItem ? "Edit" : "Add"} project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Name:</FormLabel>
                                <Input type="text" {...register("name")} />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>
                            <SimpleGrid columns={2} justifyContent="space-between">
                                <ImageSelector
                                    clearErrors={clearErrors}
                                    control={control}
                                    error={errors.icon}
                                    name="icon"
                                    setError={setError}
                                    label="Icon"
                                />
                                <ImageSelector
                                    clearErrors={clearErrors}
                                    control={control}
                                    error={errors.coverImage}
                                    name="coverImage"
                                    setError={setError}
                                    label="Cover picture"
                                />
                            </SimpleGrid>
                            <FormControl isInvalid={!!errors.type}>
                                <FormLabel>Type:</FormLabel>
                                <Input type="text" {...register("type")} />
                                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.sourceLink}>
                                <FormLabel>Source Link:</FormLabel>
                                <Input type="text" {...register("sourceLink")} />
                                <FormErrorMessage>{errors.sourceLink?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.liveLink}>
                                <FormLabel>Live Link:</FormLabel>
                                <Input type="text" {...register("liveLink")} />
                                <FormErrorMessage>{errors.liveLink?.message}</FormErrorMessage>
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
                            <FileSelector
                                clearErrors={clearErrors}
                                control={control}
                                name="description"
                                setError={setError}
                                error={errors.description}
                                label="Project Mark Down"
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
    };

export default ProfileProjectModal;