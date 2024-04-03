"use client";
import { Dispatch, SetStateAction, useState } from "react";
import {
    Button,
    useDisclosure,
    Box,
    Flex,
    ButtonGroup,
    useToast,
    Text,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from "@chakra-ui/react";
import SkillFrame from "./skillFrame.chunks";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import removeSkillCategory from "@/actions/database/home/removeSkillCategory";
import removeSkillItem from "@/actions/database/home/removeSkillItem";
import { SkillItemType, SkillCategoryType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import ProfileSkillModal from "@/components/modal/skill.modal";


const CategoryContainer: React.FC<{
    category: SkillCategoryType;
    skillItemsArray: SkillItemType[];
    setSkillItemsArray: Dispatch<SetStateAction<SkillItemType[]>>;
    setSkillCategoriesArray: Dispatch<SetStateAction<SkillCategoryType[]>>;
    setCurrentCategory: Dispatch<SetStateAction<SkillCategoryType | null>>;
    onModalOpen: () => void;
    index: number;
}> = ({
    category,
    setCurrentCategory,
    setSkillCategoriesArray,
    setSkillItemsArray,
    skillItemsArray,
    onModalOpen,
    index
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();
        const { isOpen: isItemModalOpen, onOpen: onItemModalOpen, onClose: onItemModalClose } = useDisclosure();
        const filteredItems = skillItemsArray.filter(item => item.categoryId === category.categoryId);
        const [currentItem, setCurrentItem] = useState<SkillItemType | null>(null);

        const toast = useToast();

        return (
            <>
                <Box mb={8} mt={10}>
                    <Flex alignItems="center" gap={4} py={2} px={4} rounded="md" bgColor="#dbeafe">
                        <Popover>
                            <PopoverTrigger>
                                <Text fontSize="xl" fontWeight={500} isTruncated>{index + 1}. {category.name}</Text>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Skill category</PopoverHeader>
                                <PopoverBody>{category.name}</PopoverBody>
                            </PopoverContent>
                        </Popover>
                        <ButtonGroup alignItems="center">
                            <IconButton aria-label="add skill item" icon={<FaPlus />} onClick={onItemModalOpen} />
                            <Button
                                onClick={() => {
                                    setCurrentCategory(category);
                                    onModalOpen();
                                }}
                                variant="outline"
                                size="sm"
                                colorScheme="green"
                            >
                                Edit
                            </Button>
                            <Button onClick={onOpen} variant="outline" size="sm" colorScheme="red">Remove</Button>
                        </ButtonGroup>
                    </Flex>
                    {filteredItems.length > 0 ? (
                        <Flex wrap="wrap" gap={10} justifyContent={["center", "unset"]} alignItems="center" mt={4}>
                            {filteredItems.map((item, index) => (
                                <SkillFrame
                                    key={index}
                                    item={item}
                                    setSkillItemsArray={setSkillItemsArray}
                                    onModalOpen={onItemModalOpen}
                                    setCurrentItem={setCurrentItem}
                                />
                            ))}
                        </Flex>
                    ) : (
                        <Text color="#475569" mt={4}>No item added</Text>
                    )}
                </Box>
                <ProfileSkillModal
                    currentItem={currentItem}
                    isOpen={isItemModalOpen}
                    onClose={onItemModalClose}
                    setCurrentItem={setCurrentItem}
                    setSkillItemsArray={setSkillItemsArray}
                    categoryId={category.categoryId}
                />
                <ItemDeleteModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={async () => {
                        const filteredItems = skillItemsArray.filter(item => item.categoryId === category.categoryId);
                        for (const item of filteredItems) await removeSkillItem(item.id);
                        setSkillItemsArray(prev => prev.filter(prevItem => !filteredItems.includes(prevItem)));
                        const response = await removeSkillCategory(category.categoryId);
                        setSkillCategoriesArray(prev => prev.filter(prevCollection => prevCollection !== category));
                        toast({
                            title: response.message,
                            status: response.status as "success" | "error",
                            duration: 9000,
                            isClosable: true,
                        });
                    }}
                />
            </>
        );
    };

export default CategoryContainer;