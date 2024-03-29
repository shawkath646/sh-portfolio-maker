"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import ImageSelector from "@/components/imageSelector";
import { introSchema, quickLinkSchema, socialItemSchema, titleSchema } from "@/schema/intro.schema";
import { IntroType, PartialBy } from "@/types/types";
import buttonColors from "@/JSONData/buttonColors.json";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";



const ProfileIntro = ({ introData }: { introData: IntroType }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        control,
        clearErrors,
        handleSubmit,
        register,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<PartialBy<IntroType, "skillsCategories">>({
        defaultValues: {
            fullName: introData.fullName,
            description: introData.description,
            title: introData.title,
            quickLinks: introData.quickLinks,
            socialItems: introData.socialItems,
            introPic: introData.introPic
        },
        resolver: yupResolver(introSchema),
    });

    const onSubmit: SubmitHandler<PartialBy<IntroType, "skillsCategories">> = async (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={5}>
                    <FormControl as={GridItem} isInvalid={!!errors.fullName}>
                        <FormLabel>Full Name:</FormLabel>
                        <Input type="text" {...register("fullName")} />
                        <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl as={GridItem} isInvalid={!!errors.description}>
                        <FormLabel>Description:</FormLabel>
                        <Textarea size="sm" {...register("description")} resize="none" />
                        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                    </FormControl>
                    <ImageSelector
                        clearErrors={clearErrors}
                        control={control}
                        error={errors.introPic}
                        name="introPic"
                        setError={setError}
                        label="Intro Picture"
                    />
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => {
                            const titleRef = useRef<HTMLInputElement | null>(null);
                            return (
                                <FormControl as={GridItem} isInvalid={!!errors.title}>
                                    <FormLabel>Title:</FormLabel>
                                    {field.value.length > 0 ? field.value.map((item, index) => (
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
                                        <Text fontSize="sm" color="#64748b">No title added</Text>
                                    )}
                                    <Flex alignItems="center" mt={2} gap={3}>
                                        <Input type="text" size="sm" ref={titleRef} />
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                if (titleRef.current) {
                                                    const titleValue = titleRef.current.value;
                                                    clearErrors("title");
                                                    if (field.value.includes(titleValue)) {
                                                        setError("title", { message: "Item already exists" });
                                                        return;
                                                    }
                                                    if (field.value.length >= 10) {
                                                        setError("title", { message: "Maximum item 10 reached" });
                                                        return;
                                                    }

                                                    try {
                                                        titleSchema.validateSync(titleValue);

                                                        field.onChange([...field.value, titleValue]);
                                                        titleRef.current.value = "";
                                                    } catch (error: any) {
                                                        setError("title", { message: error.message });
                                                    }
                                                }
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Flex>
                                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                                </FormControl>
                            )
                        }}
                    />
                    <Controller
                        name="socialItems"
                        control={control}
                        render={({ field }) => {
                            const socialItemRef = useRef<HTMLInputElement | null>(null);
                            return (
                                <FormControl as={GridItem} isInvalid={!!errors.socialItems}>
                                    <FormLabel>Social Items:</FormLabel>
                                    {field.value.length > 0 ? field.value.map((item, index) => (
                                        <Flex key={index} py={1} px={2} justifyContent="space-between" alignItems="center" bgColor="#f1f5f9" rounded="md" mb={2}>
                                            <Text fontSize="sm" isTruncated>{item}</Text>
                                            <IconButton
                                                icon={<MdDelete size={20} />}
                                                aria-label="Add social item"
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
                                        <Text fontSize="sm" color="#64748b">No social item added.</Text>
                                    )}
                                    <Flex alignItems="center" mt={2} gap={3}>
                                        <Input type="text" size="sm" ref={socialItemRef} />
                                        <Button
                                            size="sm"
                                            onClick={async () => {
                                                if (socialItemRef.current) {
                                                    const socialItemValue = socialItemRef.current.value;

                                                    clearErrors("socialItems");
                                                    if (field.value.includes(socialItemValue)) {
                                                        setError("socialItems", { message: "Item already exists" });
                                                        return;
                                                    }
                                                    if (field.value.length >= 10) {
                                                        setError("socialItems", { message: "Maximum item 10 reached" });
                                                        return;
                                                    }

                                                    try {
                                                        await socialItemSchema.validate(socialItemValue);

                                                        field.onChange([...field.value, socialItemValue]);
                                                        socialItemRef.current.value = "";
                                                    } catch (error: any) {
                                                        setError("socialItems", { message: error.message });
                                                    }
                                                }
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Flex>
                                    <FormErrorMessage>{errors.socialItems?.message}</FormErrorMessage>
                                </FormControl>
                            )
                        }}
                    />
                    <Controller
                        name="quickLinks"
                        control={control}
                        render={({ field }) => {
                            const [selectedColor, setColor] = useState("");
                            const quickLinkNameRef = useRef<HTMLInputElement | null>(null);
                            const quickLinkHrefRef = useRef<HTMLInputElement | null>(null);
                            return (
                                <FormControl as={GridItem} isInvalid={!!errors.quickLinks}>
                                    <FormLabel>Quick Links:</FormLabel>
                                    <ButtonGroup>
                                        {field.value.length > 0 ? field.value.map((item, index) => (
                                            <Button
                                                key={index}
                                                colorScheme={item.color}
                                                rounded={20}
                                                size="sm"
                                                rightIcon={
                                                    <RxCross2 onClick={() => {
                                                        const filteredValue = field.value.filter(prevItem => prevItem !== item);
                                                        field.onChange(filteredValue);
                                                    }} />
                                                }
                                            >
                                                {item.name}
                                            </Button>
                                        )) : (
                                            <Text fontSize="sm" color="#64748b">No quick link added.</Text>
                                        )}
                                    </ButtonGroup>
                                    <Box mt={2} gap={3}>
                                        <FormLabel fontSize="sm">Name:</FormLabel>
                                        <Input type="text" size="sm" mb={1.5} ref={quickLinkNameRef} />
                                        <FormLabel fontSize="sm">URL:</FormLabel>
                                        <Input type="text" size="sm" ref={quickLinkHrefRef} />
                                        <Flex gap={2} alignItems="center" mt={1.5}>
                                            <Menu isLazy>
                                                <MenuButton as={Button} rightIcon={<IoIosArrowDown />} size="sm">{selectedColor || "Select color"}</MenuButton>
                                                <MenuList>
                                                    {buttonColors.map((color, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            onClick={() => setColor(color.name.toLowerCase())}
                                                            justifyContent="space-between"
                                                        >
                                                            <Text>{color.name}</Text>
                                                            <Box h={5} w={5} bgColor={color.hex} rounded="sm"></Box>
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </Menu>
                                            <Button
                                                size="sm"
                                                ml="auto"
                                                onClick={async () => {
                                                    if (quickLinkNameRef.current && quickLinkHrefRef.current) {
                                                        const quickLinkNameValue = quickLinkNameRef.current.value;
                                                        const quickLinkHrefValue = quickLinkHrefRef.current.value;

                                                        clearErrors("quickLinks");


                                                        const quickLinkItem = {
                                                            name: quickLinkNameValue,
                                                            href: quickLinkHrefValue,
                                                            color: selectedColor
                                                        };

                                                        if (field.value.includes(quickLinkItem)) {
                                                            setError("quickLinks", { message: "Item already exists" });
                                                            return;
                                                        }
                                                        if (field.value.length >= 10) {
                                                            setError("quickLinks", { message: "Maximum item 10 reached" });
                                                            return;
                                                        }

                                                        try {
                                                            await quickLinkSchema.validate(quickLinkItem);

                                                            field.onChange([...field.value, quickLinkItem]);
                                                            quickLinkNameRef.current.value = "";
                                                            quickLinkHrefRef.current.value = "";
                                                            setColor("");
                                                        } catch (error: any) {
                                                            setError("quickLinks", { message: error.message });
                                                        }
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Flex>
                                    </Box>
                                    <FormErrorMessage>{errors.quickLinks?.message}</FormErrorMessage>
                                </FormControl>
                            )
                        }}
                    />
                </SimpleGrid>
                <ButtonGroup mt={4} justifyContent="end" w="full">
                    <Button onClick={onOpen} colorScheme='green'>Reset</Button>
                    <Button type="submit" isLoading={isSubmitting} colorScheme='twitter'>Update Intro</Button>
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

export default ProfileIntro;