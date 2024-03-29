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
import { SkillItemType, SkillsCategoryType, PartialBy } from "@/types/types";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { MdDelete, MdWorkspaces } from "react-icons/md";



interface SkillsFormType {
    skillsCategories: SkillsCategoryType[];
    skillItems: PartialBy<SkillItemType, "id">[];
}

const ProfileSkills = ({ skillItems, skillsCategories }: { skillItems: SkillItemType[], skillsCategories: SkillsCategoryType[] }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isCategoryModalOpen, onOpen: onCategoryModalOpen, onClose: onCategoryModalClose } = useDisclosure();

    const {
        control,
        clearErrors,
        handleSubmit,
        reset,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SkillsFormType>({
        defaultValues: {
            skillItems,
            skillsCategories
        }
    });

    const onSubmit: SubmitHandler<SkillsFormType> = async (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h5" size="lg" mt={10} mb={1}>Skills</Heading>
                <Divider />
                <Flex mt={5} wrap={["wrap-reverse", "wrap-reverse", "wrap"]} gap={5}>
                    <Box w="350px">
                        <Controller
                            name="skillsCategories"
                            control={control}
                            render={({ field }) => {
                                const categoryRef = useRef<HTMLInputElement | null>(null);
                                return (
                                    <FormControl isInvalid={!!errors.skillsCategories} w="350px">
                                        <FormLabel>Category</FormLabel>
                                        <Input type="text" ref={categoryRef} />
                                        <FormErrorMessage>{errors.skillsCategories?.message}</FormErrorMessage>
                                        <Button
                                            mt={2}
                                            ml="auto"
                                            size="sm"
                                            onClick={() => {
                                                if (categoryRef.current) {
                                                    const categoryValue = categoryRef.current.value;

                                                    clearErrors("skillsCategories");
                                                    const schema = yup.string()
                                                        .required("Category is required")
                                                        .min(3, "Minimum 3 characters required")
                                                        .max(32, "Maximum 32 characters allowed");

                                                    try {
                                                        schema.validateSync(categoryValue);

                                                        if (field.value.length >= 32) {
                                                            setError("skillsCategories", { message: "Maximum category reached" });
                                                            return;
                                                        }

                                                        let categoryId = 0;
                                                        let categoryExists = field.value.find(category => category.categoryId === categoryId);
                                                        while (categoryExists) {
                                                            categoryId++;
                                                            categoryExists = field.value.find(category => category.categoryId === categoryId);
                                                        }

                                                        const categoryObject: SkillsCategoryType = {
                                                            categoryId,
                                                            name: categoryValue
                                                        }

                                                        field.onChange([...field.value, categoryObject]);
                                                        categoryRef.current.value = "";
                                                    } catch (error: any) {
                                                        setError("skillsCategories", { message: error.message });
                                                    }
                                                }
                                            }}
                                        >
                                            Add Category
                                        </Button>
                                    </FormControl>
                                )
                            }}
                        />
                        <Divider my={2} />
                        <Controller
                            name="skillItems"
                            control={control}
                            render={({ field }) => {
                                const [selectedCategory, setCategory] = useState<number | null>(null);
                                const [selectedImage, setSelectedImage] = useState("");
                                const skillsCategories = watch("skillsCategories");
                                const nameRef = useRef<HTMLInputElement | null>(null);
                                const skillIconRef = useRef<HTMLInputElement | null>(null);
                                return (
                                    <FormControl isInvalid={!!errors.skillItems}>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" ref={nameRef} />
                                        <Flex mt={1.5} gap={3}>
                                            <Stack>
                                                <Menu>
                                                    <MenuButton
                                                        as={Button}
                                                        rightIcon={<IoIosArrowDown />}
                                                        size="sm"
                                                    >
                                                        {skillsCategories.find(prevCategory => prevCategory.categoryId === selectedCategory)?.name || "Select category"}
                                                    </MenuButton>
                                                    <MenuList>
                                                        {skillsCategories.map((category, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                onClick={() => setCategory(category.categoryId)}
                                                                justifyContent="space-between"
                                                            >
                                                                <Text>{category.name}</Text>
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </Menu>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        if (skillIconRef.current) skillIconRef.current.click();
                                                    }}
                                                >
                                                    {selectedImage ? "Change picture" : "Select picture"}
                                                </Button>
                                                <Input
                                                    type="file"
                                                    ref={skillIconRef}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                        const files = event.target.files;

                                                        clearErrors("skillItems");

                                                        if (!files || files.length === 0) return;
                                                        const file = files[0];

                                                        if (file.size > 3 * 1024 * 1024) {
                                                            setError("skillItems", { message: "File size can't exceed 3MB" });
                                                            return;
                                                        }

                                                        const reader = new FileReader();
                                                        reader.onload = () => {
                                                            const base64 = reader.result;
                                                            setSelectedImage(base64 as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }}
                                                    accept="image/*"
                                                    hidden
                                                />
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
                                                <FormErrorMessage>{errors.skillItems?.message}</FormErrorMessage>
                                                <Button
                                                    size="sm"
                                                    w="full"
                                                    onClick={() => {
                                                        if (nameRef.current) {
                                                            const titleValue = nameRef.current.value;
                                                            clearErrors("skillItems");

                                                            const schema = yup.object().shape({
                                                                name: yup.string()
                                                                    .required("Title is required")
                                                                    .min(3, "Minimum 3 characters required")
                                                                    .max(32, "Maximum 32 characters allowed"),
                                                                categoryId: yup.number().nonNullable("Category is required"),
                                                                icon: yup.string(),
                                                            });

                                                            const featuredObject: PartialBy<SkillItemType, "id"> = {
                                                                icon: selectedImage,
                                                                name: titleValue,
                                                                categoryId: selectedCategory as number,
                                                            };

                                                            try {
                                                                schema.validateSync(featuredObject);
                                                                field.onChange([...field.value, featuredObject]);

                                                                nameRef.current.value = "";
                                                                setSelectedImage("");
                                                                setCategory(null);
                                                            } catch (error: any) {
                                                                setError("skillItems", { message: error.message });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </Box>
                                        </Flex>
                                    </FormControl>
                                )
                            }}
                        />
                    </Box>
                    <Divider h="400px" orientation='vertical' display={["none", "none", "unset"]} />
                    {(() => {
                        const categories = watch("skillsCategories");
                        const skillItems = watch("skillItems");
                        return (categories.length > 0) ? (
                            <Stack gap={5}>
                                {categories.map((category, index) => {
                                    const filteredSkillItems = skillItems.filter(item => item.categoryId === category.categoryId);
                                    return (
                                        <Box key={index}>
                                            <Flex alignItems="center" gap={2}>
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
                                                    onClick={() => onCategoryModalOpen()}
                                                />
                                                <Text fontWeight={500} fontSize="lg">{category.name}</Text>
                                                <IoIosArrowForward size={20} />
                                            </Flex>
                                            {filteredSkillItems.length > 0 ? (
                                                <Flex wrap="wrap" gap={5}>
                                                    {filteredSkillItems.map((item, index) => (
                                                        <Flex key={index} alignItems="center" gap={3} mt={3}>
                                                            {item.icon ? (
                                                                <Image src={item.icon} alt={`${item.name} icon`} height={42} width={42} />
                                                            ) : (
                                                                <MdWorkspaces size={24} style={{ color: "#0ea5e9" }} />
                                                            )}
                                                            <Text fontSize="20px" fontWeight={500}>{item.name}</Text>
                                                            <IconButton
                                                                icon={<MdDelete size={20} />}
                                                                aria-label="skill item delete"
                                                                variant="none"
                                                                h={6}
                                                                w={6}
                                                                color="#f43f5e"
                                                                _hover={{
                                                                    color: "#e11d48",
                                                                    transition: "color 0.3s ease",
                                                                }}
                                                                onClick={() => {
                                                                    const filteredValue = skillItems.filter(prevItem => prevItem !== item);
                                                                    setValue("skillItems", filteredValue);
                                                                }}
                                                            />
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            ) : (
                                                <Text fontSize="sm" color="#64748b" mt={2}>No skills have been added to this category.</Text>
                                            )}
                                            <Modal isOpen={isCategoryModalOpen} onClose={onCategoryModalClose}>
                                                <ModalOverlay
                                                    bg='blackAlpha.400'
                                                />
                                                <ModalContent>
                                                    <ModalHeader>Are you sure you want to delete this category?</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        Deleting this category will remove all items that are in this category.
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button
                                                            colorScheme='red'
                                                            mr={3}
                                                            onClick={() => {
                                                                const filteredCategory = categories.filter(prevCategory => prevCategory !== category);
                                                                const skillItemsAfterDelete = skillItems.filter(deletedItem => !filteredSkillItems.includes(deletedItem));
                                                                setValue("skillItems", skillItemsAfterDelete);
                                                                setValue("skillsCategories", filteredCategory);
                                                                onCategoryModalClose();
                                                            }}
                                                        >
                                                            Confirm Delete
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </Box>
                                    )
                                })}
                            </Stack>
                        ) : (
                            <Text fontSize="sm" color="#64748b">No skill item added.</Text>
                        );
                    })()}
                </Flex>
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

export default ProfileSkills;