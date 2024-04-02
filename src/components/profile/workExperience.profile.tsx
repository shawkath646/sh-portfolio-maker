"use client";
import { useState } from "react";
import {
    Heading,
    Divider,
    Box,
    Text,
    useDisclosure,
    SimpleGrid,
    Flex,
    IconButton,
    Center
} from "@chakra-ui/react";
import ProfileWorkExperienceModal from "@/components/modal/workExperience.modal";
import WorkExperienceFrame from "@/components/profile/chunks/workExperience.chunks";
import { WorkExperienceItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";




const ProfileWorkExperience = ({ workExperienceItems }: { workExperienceItems: WorkExperienceItemType[] }) => {

    const [workExperienceItemsArray, setWorkExperienceItemsArray] = useState<WorkExperienceItemType[]>(workExperienceItems);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentItem, setCurrentItem] = useState<WorkExperienceItemType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Work Experience</Heading>
                <IconButton aria-label="add work experience item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />
            {workExperienceItemsArray.length > 0 ? (
                <SimpleGrid flex="1" columns={[1, 1, 1, 2, 2, 3]} gap={4} mt={2}>
                    {workExperienceItemsArray.map((item, index) => (
                        <WorkExperienceFrame
                            key={index}
                            index={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setWorkExperienceItemsArray={setWorkExperienceItemsArray}
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
            <ProfileWorkExperienceModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setWorkExperienceItemsArray={setWorkExperienceItemsArray}
            />
        </>
    );
};

export default ProfileWorkExperience;