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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import introSchema from "@/schema/introSchema";
import { IntroType, QuickLinksType } from "@/types/types";
import buttonColors from "@/JSONData/buttonColors.json";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


interface HomeFormType {
    fullName: string;
    description: string;
    introPic?: string;
    title: string[];
    quickLinks: QuickLinksType[];
    socialItems: string[];
}


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
    } = useForm<HomeFormType>({
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

    const onSubmit: SubmitHandler<HomeFormType> = async (data) => {
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
                    <Controller
                        name="introPic"
                        defaultValue=""
                        control={control}
                        render={({ field }) => {
                            const fileInputRef = useRef<HTMLInputElement | null>(null);
                            return (
                                <FormControl as={GridItem} isInvalid={!!errors.introPic}>
                                    <FormLabel>Intro Picture:</FormLabel>
                                    <Stack alignItems="center" gap={3} justifyContent="center">
                                        {field.value ? (
                                            <Image
                                                src={field.value}
                                                alt="intro picture"
                                                height={60}
                                                width={60}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    borderRadius: "100%"
                                                }}
                                            />
                                        ) : (
                                            <Text fontSize="sm" color="#64748b">No picture selected</Text>
                                        )}
                                        <ButtonGroup>
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    if (fileInputRef.current) fileInputRef.current.click();
                                                }}
                                            >
                                                Select picture
                                            </Button>
                                            {field.value && (
                                                <Button
                                                    size="sm"
                                                    colorScheme="red"
                                                    onClick={() => field.onChange("")}
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </ButtonGroup>
                                    </Stack>
                                    <Input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files;

                                            clearErrors("introPic");

                                            if (!files || files.length === 0) return;
                                            const file = files[0];

                                            if (file.size > 3 * 1024 * 1024) {
                                                setError("introPic", { message: "File size can't exceed 3MB" });
                                                return;
                                            }

                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                const base64 = reader.result;
                                                field.onChange(base64);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                        accept="image/*"
                                        hidden
                                    />
                                    <FormErrorMessage>{errors.introPic?.message}</FormErrorMessage>
                                </FormControl>
                            )
                        }}
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

                                                    if (!titleValue) {
                                                        setError("title", { message: "Title is required" });
                                                        return;
                                                    }

                                                    const schema = yup.object().shape({
                                                        title: yup.string().required("Title is required")
                                                            .min(3, "Minimum 3 character required")
                                                            .max(50, "Maximum 50 character allowed"),
                                                    });

                                                    try {
                                                        schema.validateSync({ title: titleValue });

                                                        if (field.value.length >= 8) {
                                                            setError("title", { message: "Maximum title reached!" });
                                                            return;
                                                        }

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

                                                    const schema = yup.object().shape({
                                                        socialItem: yup.string().required("Social item is required").url("Invalid URL detected")
                                                    });

                                                    try {
                                                        await schema.validate({
                                                            socialItem: socialItemValue
                                                        });

                                                        if (field.value.length >= 10) {
                                                            setError("socialItems", { message: "Maximum social item reached!" });
                                                            return;
                                                        }

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

                                                        const schema = yup.object().shape({
                                                            quickLinkName: yup.string()
                                                                .required("Name is required")
                                                                .min(3, "Minimum 3 character required")
                                                                .max(15, "Maximum 15 character allowed"),
                                                            quickLinkHref: yup.string().url("Invalid URL detected").required("URL is required"),
                                                            selectedColor: yup.string().required("Button color is required")
                                                        });

                                                        try {
                                                            await schema.validate({
                                                                quickLinkName: quickLinkNameValue,
                                                                quickLinkHref: quickLinkHrefValue,
                                                                selectedColor: selectedColor
                                                            });

                                                            if (field.value.length >= 10) {
                                                                setError("quickLinks", { message: "Maximum quick link reached!" });
                                                                return;
                                                            }

                                                            const object = {
                                                                name: quickLinkNameValue,
                                                                href: quickLinkHrefValue,
                                                                color: selectedColor
                                                            };

                                                            field.onChange([...field.value, object]);
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