"use client";
import { useState } from "react";
import {
    Heading,
    Divider,
    Flex,
    useDisclosure,
    IconButton,
    Box,
    Text,
    Center
} from "@chakra-ui/react";
import CategoryContainer from "./chunks/categoryContainer.chunks";
import ProfileSkillCategoryModal from "../modal/skillCategory.modal";
import { SkillItemType, SkillCategoryType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileSkills = ({ skillItems, skillCategories }: { skillItems: SkillItemType[], skillCategories: SkillCategoryType[] }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [skillCategoriesArray, setSkillCategoriesArray] = useState(skillCategories);
    const [skillItemsArray, setSkillItemsArray] = useState(skillItems);
    const [currentCategory, setCurrentCategory] = useState<SkillCategoryType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1}>
                <Heading as="h5" size="lg">Skills</Heading>
                <IconButton aria-label="add education item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />
            <Box minH="400px">
                {skillCategoriesArray.length > 0 ? (
                    skillCategoriesArray.map((category, index) => (
                        <CategoryContainer
                            key={index}
                            index={index}
                            category={category}
                            onModalOpen={onOpen}
                            setCurrentCategory={setCurrentCategory}
                            setSkillCategoriesArray={setSkillCategoriesArray}
                            setSkillItemsArray={setSkillItemsArray}
                            skillItemsArray={skillItemsArray}
                        />
                    ))
                ) : (
                    <Box as={Center} h="350px">
                        <Flex alignItems="center" gap={2}>
                            <IoIosWarning size={24} />
                            <Text fontSize="lg">No item added</Text>
                        </Flex>
                    </Box>
                )}
            </Box>
            <ProfileSkillCategoryModal
                currentCategory={currentCategory}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentCategory={setCurrentCategory}
                setSkillCategoriesArray={setSkillCategoriesArray}
            />
        </>
    );
};

export default ProfileSkills;