"use client";
import { useState } from "react";
import {
    Heading,
    Divider,
    SimpleGrid,
    useDisclosure,
    Box,
    Text,
    Flex,
    IconButton,
    Center
} from "@chakra-ui/react";
import ProfileEducationModal from "@/components/modal/education.modal";
import EducationFrame from "@/components/profile/chunks/educationFrame.chunks";
import { EducationItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileEducation: React.FC<{ educationItems: EducationItemType[] }> = ({ educationItems }) => {

    const [educationItemsArray, setEducationItemsArray] = useState<EducationItemType[]>(educationItems);
    const [currentItem, setCurrentItem] = useState<EducationItemType | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1}>
                <Heading as="h5" size="lg">Education</Heading>
                <IconButton aria-label="add education item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />

            {educationItemsArray.length > 0 ? (
                <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} gap={4} mt={2}>
                    {educationItemsArray.map((item, index) => (
                        <EducationFrame
                            key={index}
                            index={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setEducationItemsArray={setEducationItemsArray}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Box as={Center} h="350px">
                    <Flex alignItems="center" gap={2}>
                        <IoIosWarning size={24} />
                        <Text fontSize="lg">No item added</Text>
                    </Flex>
                </Box>
            )}
            <ProfileEducationModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setEducationItemsArray={setEducationItemsArray}
            />
        </>
    );
};

export default ProfileEducation;