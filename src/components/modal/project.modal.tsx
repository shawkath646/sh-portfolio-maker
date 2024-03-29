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
    Checkbox,
    SimpleGrid,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ImageSelector from "@/components/imageSelector";
import FileSelector from "@/components/fileSelector";
import { projectSchema } from "@/schema/project.schema";
import { v4 as uuidv4 } from 'uuid';
import { ProjectItemType } from "@/types/types";


export interface ProjectItemFormType {
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
            formState: { errors },
        } = useForm<ProjectItemFormType>({
            defaultValues: {
                startsFrom: new Date,
                endsOn: new Date,
            },
            resolver: yupResolver(projectSchema)
        });

        const onSubmit: SubmitHandler<ProjectItemFormType> = (data) => {

            const { isPresent, ...volunteeringData } = data;
            const endsOn = isPresent ? null : volunteeringData.endsOn;

            if (currentItem) {
                const volunteeringObject: ProjectItemType = {
                    ...volunteeringData,
                    endsOn: endsOn,
                    id: currentItem.id,
                };
                setProjectItemsArray(prev => {
                    const existingItem = prev.filter(prevItem => prevItem.id !== currentItem.id);
                    existingItem.push(volunteeringObject);
                    return existingItem;
                });
            } else {
                const volunteeringObject: ProjectItemType = {
                    ...volunteeringData,
                    endsOn: endsOn,
                    id: uuidv4(),
                };
                setProjectItemsArray(prev => [...prev, volunteeringObject]);
            }

            onClose();
            setCurrentItem(null);
            reset();
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