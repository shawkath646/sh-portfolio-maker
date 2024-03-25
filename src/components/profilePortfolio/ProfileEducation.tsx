"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import {
    Heading,
    Divider,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Text,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    FormErrorMessage,
    ButtonGroup,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { SkillItemType, SkillsCategoryType, PartialBy, EducationType } from "@/types/types";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdDelete, MdWorkspaces } from "react-icons/md";

interface EducationFormType {
    educationItems: PartialBy<EducationType, "id">[];
}

const ProfileEducation = ({ educationItems }: { educationItems: EducationType[] }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        control,
        clearErrors,
        handleSubmit,
        reset,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EducationFormType>({
        defaultValues: {
            educationItems
        }
    });

    const onSubmit: SubmitHandler<EducationFormType> = async (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ButtonGroup mt={4} justifyContent="end" w="full">
                    <Button onClick={onOpen} colorScheme='green'>Reset</Button>
                    <Button type="submit" isLoading={isSubmitting} colorScheme='twitter'>Update Skills</Button>
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

export default ProfileEducation;