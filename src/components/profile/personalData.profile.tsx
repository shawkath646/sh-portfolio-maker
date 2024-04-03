"use client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import {
    FormControl,
    FormLabel,
    GridItem,
    SimpleGrid,
    Input,
    FormErrorMessage,
    ButtonGroup,
    Button,
    RadioGroup,
    Stack,
    Radio,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Checkbox,
    useToast,
} from "@chakra-ui/react";
import TextAddItem from "@/components/textAddItem";
import DateSelector from "@/components/dateSelector";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDataSchema }from "@/schema/personalData.schema";
import { PersonalDataType } from "@/types/types";
import addPersonalData from "@/actions/database/preferences/addPersonalData";


interface PersonalDataFormType {
    dateOfBirth: Date;
    interestedIn: string[];
    languages: string[];
    presentAddressLine1: string;
    presentAddressLine2: string;
    permanentAddressLine1: string;
    permanentAddressLine2: string;
    maritalStatus: string;
    isDateOfBirthHidden: boolean;
}

const ProfilePreferences: React.FC<{ personalData: PersonalDataType }> = ({ personalData }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        control,
        clearErrors,
        handleSubmit,
        register,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<PersonalDataFormType>({
        defaultValues: {
            dateOfBirth: personalData.dateOfBirth as Date || new Date,
            interestedIn: personalData.interestedIn,
            languages: personalData.languages,
            maritalStatus: personalData.maritalStatus,
            presentAddressLine1: personalData.presentAddress.line1,
            presentAddressLine2: personalData.presentAddress.line2,
            permanentAddressLine1: personalData.permanentAddress.line1,
            permanentAddressLine2: personalData.permanentAddress.line2,
        },
        resolver: yupResolver(personalDataSchema),
    });

    const toast = useToast();

    const maritalStatusTypes = ["Hidden", "Single", "Married", "Divorced", "Widowed", "Separated", "Domestic Partnership", "Civil Union", "Annulled", "Other"];

    const onSubmit: SubmitHandler<PersonalDataFormType> = async (data) => {
        const { presentAddressLine1, presentAddressLine2, permanentAddressLine1, permanentAddressLine2, isDateOfBirthHidden, dateOfBirth, ...restData } = data;
        const perosnalDataObject: PersonalDataType = {
            ...restData,
            permanentAddress: {
                line1: permanentAddressLine1,
                line2: permanentAddressLine2,
            },
            presentAddress : {
                line1: presentAddressLine1,
                line2: presentAddressLine2
            },
            dateOfBirth: isDateOfBirthHidden ? null : dateOfBirth, 
        };

        const response = await addPersonalData(perosnalDataObject);

        toast({
            title: response.message,
            status: response.status as "success" | "error",
            duration: 9000,
            isClosable: true,
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, 1, 2]} gap={4}>
                    <GridItem maxW="lg">
                        <DateSelector
                            control={control}
                            error={errors.dateOfBirth}
                            name="dateOfBirth"
                            label="Date of Birth"
                        />
                        <Checkbox {...register("isDateOfBirthHidden")}>Hidden</Checkbox>
                        <FormControl isInvalid={!!errors.presentAddressLine1} mt={5}>
                            <FormLabel>Present Address Line 1:</FormLabel>
                            <Input type="text" {...register("presentAddressLine1")} />
                            <FormErrorMessage>{errors.presentAddressLine1?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.presentAddressLine2}>
                            <FormLabel>Present Address Line 2:</FormLabel>
                            <Input type="text" {...register("presentAddressLine2")} />
                            <FormErrorMessage>{errors.presentAddressLine2?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.permanentAddressLine1} mt={5}>
                            <FormLabel>Permanent Address Line 1:</FormLabel>
                            <Input type="text" {...register("permanentAddressLine1")} />
                            <FormErrorMessage>{errors.permanentAddressLine1?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.permanentAddressLine2}>
                            <FormLabel>Permanent Address Line 2:</FormLabel>
                            <Input type="text" {...register("permanentAddressLine2")} />
                            <FormErrorMessage>{errors.permanentAddressLine2?.message}</FormErrorMessage>
                        </FormControl>
                        <Controller
                            name="maritalStatus"
                            control={control}
                            render={({ field }) => (
                                <FormControl mt={10}>
                                    <FormLabel>Maritial Status:</FormLabel>
                                    <RadioGroup onChange={field.onChange} value={field.value}>
                                        <Stack direction='row' flexWrap="wrap">
                                            {maritalStatusTypes.map((item, index) => <Radio key={index} value={item}>{item}</Radio>)}
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </GridItem>
                    <GridItem maxW="lg">
                        <TextAddItem
                            clearErrors={clearErrors}
                            control={control}
                            name="languages"
                            setError={setError}
                            error={errors.languages}
                            label="Languages"
                            maxItems={15}
                            maxLength={20}
                        />
                        <TextAddItem
                            clearErrors={clearErrors}
                            control={control}
                            name="interestedIn"
                            setError={setError}
                            error={errors.interestedIn}
                            label="Interested In"
                            maxItems={50}
                            maxLength={32}
                        />
                    </GridItem>
                </SimpleGrid>
                <ButtonGroup mt={4} justifyContent="end" w="full">
                    <Button colorScheme='green' onClick={onOpen}>Reset</Button>
                    <Button type="submit" isLoading={isSubmitting} colorScheme='twitter'>Update Prefereces</Button>
                </ButtonGroup>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure you want to reset the changes?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Your all changes will revert. This action cannot be undone. This will restore the data to its previous state.
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                        >
                            Confirm Reset
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfilePreferences;