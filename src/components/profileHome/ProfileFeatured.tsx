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
    Input, Card,
    CardBody,
    Center,
    Text,
    Menu,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    FormErrorMessage,
    ButtonGroup,
    Textarea,
    Stack,
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
import { FeaturedItemType } from "@/types/types";
import cardColors from "@/JSONData/cardColors.json";
import { IoIosArrowDown } from "react-icons/io";


interface FeaturedFormType {
    featuredItems: FeaturedItemType[];
}

const ProfileFeatured = ({ featuredItems }: { featuredItems: FeaturedItemType[] }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        control,
        clearErrors,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FeaturedFormType>({
        defaultValues: {
            featuredItems
        }
    });

    const onSubmit: SubmitHandler<FeaturedFormType> = async(data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h5" size="lg" mt={10} mb={1}>Featured</Heading>
                <Divider />
                <Controller
                    name="featuredItems"
                    control={control}
                    render={({ field }) => {
                        const [selectedColor, setColor] = useState<string>("");
                        const [selectedImage, setSelectedImage] = useState("");
                        const titleRef = useRef<HTMLInputElement | null>(null);
                        const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
                        const featuredItemIconRef = useRef<HTMLInputElement | null>(null);
                        return (
                            <Flex mt={5} wrap={["wrap-reverse", "wrap-reverse", "wrap"]} gap={5}>
                                <Box w="350px">
                                    <FormControl isInvalid={!!errors.featuredItems}>
                                        <FormLabel>Title:</FormLabel>
                                        <Input type="text" ref={titleRef} />
                                        <FormLabel>Description:</FormLabel>
                                        <Textarea ref={descriptionRef} resize="none" />
                                        <Flex mt={1.5} gap={3}>
                                            <Stack>
                                                <Menu>
                                                    <MenuButton
                                                        as={Button}
                                                        rightIcon={<IoIosArrowDown />}
                                                        size="sm"
                                                    >
                                                        {selectedColor ? cardColors.find(e => e.hex === selectedColor)?.name : "Select color"}
                                                    </MenuButton>
                                                    <MenuList>
                                                        {cardColors.map((color, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                onClick={() => setColor(color.hex)}
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
                                                    onClick={() => {
                                                        if (featuredItemIconRef.current) featuredItemIconRef.current.click();
                                                    }}
                                                >
                                                    {selectedImage ? "Change picture" : "Select picture"}
                                                </Button>
                                                {selectedImage && (
                                                    <Button
                                                        size="sm"
                                                        colorScheme="red"
                                                        onClick={() => setSelectedImage("")}
                                                    >
                                                        Remove picture
                                                    </Button>
                                                )}
                                            </Stack>
                                            <Box w="full">
                                                <Box height="73px" mb={2}>
                                                    {selectedImage && (
                                                        <Image
                                                            src={selectedImage}
                                                            alt="featured items icon"
                                                            height={73}
                                                            width={73}
                                                            style={{
                                                                height: "73px",
                                                                width: "auto",
                                                                margin: "0 auto"
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                                <Button
                                                    size="sm"
                                                    w="full"
                                                    onClick={() => {
                                                        if (titleRef.current && descriptionRef.current) {
                                                            const titleValue = titleRef.current.value;
                                                            const descriptionValue = descriptionRef.current.value;

                                                            clearErrors("featuredItems");

                                                            const schema = yup.object().shape({
                                                                title: yup.string().required("Title is required"),
                                                                description: yup.string().required("Description is required"),
                                                                selectedColor: yup.string().required("Color is required")
                                                            });

                                                            try {
                                                                schema.validateSync({
                                                                    title: titleValue,
                                                                    description: descriptionValue,
                                                                    selectedColor,
                                                                });

                                                                const featuredObject = {
                                                                    icon: selectedImage,
                                                                    color: selectedColor,
                                                                    description: descriptionValue,
                                                                    title: titleValue
                                                                };

                                                                field.onChange([...field.value, featuredObject]);

                                                                titleRef.current.value = "";
                                                                descriptionRef.current.value = "";
                                                                setSelectedImage("");
                                                                setColor("");
                                                            } catch (error: any) {
                                                                setError("featuredItems", { message: error.message });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </Box>
                                        </Flex>
                                        <Input
                                            type="file"
                                            ref={featuredItemIconRef}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                const files = event.target.files;

                                                clearErrors("featuredItems");

                                                if (!files || files.length === 0) return;
                                                const file = files[0];

                                                if (file.size > 3 * 1024 * 1024) {
                                                    setError("featuredItems", { message: "File size can't exceed 3MB" });
                                                    return;
                                                }

                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    const base64 = reader.result;
                                                    setSelectedImage(base64 as string);
                                                };
                                                reader.readAsDataURL(file);
                                            }}
                                            hidden
                                        />
                                        <FormErrorMessage>{errors.featuredItems?.message}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Divider h="400px" orientation='vertical' display={["none", "none", "unset"]} />
                                {field.value.length > 0 ? (
                                    <Flex wrap="wrap" gap={5} justifyItems="center" w="fit-content">
                                        {field.value.map((item, index) => (
                                            <Card
                                                key={index}
                                                maxW="sm"
                                                minW="xs"
                                                bgColor={item.color}
                                                h={["auto", "auto", 500]}
                                                mx="auto"
                                            >
                                                <CardBody>
                                                    <Center>
                                                        {item.icon && (
                                                            <Image
                                                                src={item.icon}
                                                                alt="Dream Card Thumbnail"
                                                                width={80}
                                                                height={80}
                                                                style={{
                                                                    height: "80px",
                                                                    width: "80px",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        )}
                                                    </Center>
                                                    <Heading size="lg" textAlign="center" mb={2} h="40px">{item.title}</Heading>
                                                    <Text h="300px">{item.description}</Text>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        colorScheme="red"
                                                        w="full"
                                                        onClick={() => {
                                                            const filteredValue = field.value.filter(prevItem => prevItem !== item);
                                                            field.onChange(filteredValue);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </CardBody>
                                            </Card>
                                        ))}
                                    </Flex>
                                ) : (
                                    <Text fontSize="sm" color="#64748b">No featured item added.</Text>
                                )}
                            </Flex>
                        )
                    }}
                />
                <ButtonGroup mt={4} justifyContent="end" w="full">
                    <Button onClick={onOpen} colorScheme='green'>Reset</Button>
                    <Button type="submit" isLoading={isSubmitting} colorScheme='twitter'>Update Featured</Button>
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

export default ProfileFeatured;