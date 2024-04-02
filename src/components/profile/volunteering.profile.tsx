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
import ProfileVolunteeringModal from "@/components/modal/volunteering.modal";
import VolunteeringFrame from "@/components/profile/chunks/volunteering.chunks";
import { VolunteeringItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileVolunteering: React.FC<{ volunteeringItems: VolunteeringItemType[] }> = ({ volunteeringItems }) => {

    const [volunteeringItemsArray, setVolunteeringItemsArray] = useState<VolunteeringItemType[]>(volunteeringItems);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentItem, setCurrentItem] = useState<VolunteeringItemType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Volunteering</Heading>
                <IconButton aria-label="add volunteering item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />

            {volunteeringItemsArray.length > 0 ? (
                <SimpleGrid flex="1" columns={[1, 1, 1, 2, 2, 3]} gap={4} mt={2}>
                    {volunteeringItemsArray.map((item, index) => (
                        <VolunteeringFrame
                            key={index}
                            index={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setVolunteeringItemsArray={setVolunteeringItemsArray}
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
            <ProfileVolunteeringModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setEducationItemsArray={setVolunteeringItemsArray}
            />
        </>
    );
};

export default ProfileVolunteering;