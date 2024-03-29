"use client";
import { useState } from "react";
import {
    SimpleGrid,
    useDisclosure,
    Box,
    Text,
    Flex,
    IconButton,
    Center,
} from "@chakra-ui/react";
import ProfileProjectModal from "@/components/modal/project.modal";
import ProjectFrame from "@/components/profile/projects.chunks/projectFrame.chunks";
import { ProjectItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileProjects: React.FC<{ projectItems: ProjectItemType[] }> = ({ projectItems }) => {

    const [projectItemsArray, setProjectItemsArray] = useState<ProjectItemType[]>(projectItems);
    const [currentItem, setCurrentItem] = useState<ProjectItemType | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex justifyContent="end">
                <IconButton aria-label="add project item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            {projectItemsArray.length > 0 ? (
                <SimpleGrid minChildWidth="350px" justifyItems="center" gap={4} mt={5}>
                    {projectItemsArray.map((item, index) => (
                        <ProjectFrame
                            key={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setProjectItemsArray={setProjectItemsArray}
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
            <ProfileProjectModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setProjectItemsArray={setProjectItemsArray}
            />
        </>
    );
};

export default ProfileProjects;