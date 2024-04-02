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
import ProfileEventModal from "@/components/modal/event.modal";
import EventFrame from "@/components/profile/chunks/eventFrame.chunks";
import { EventItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";



const ProfileEvent: React.FC<{ eventItems: EventItemType[] }> = ({ eventItems }) => {

    const [eventItemsArray, setEventItemsArray] = useState<EventItemType[]>(eventItems);
    const [currentItem, setCurrentItem] = useState<EventItemType | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Life Events</Heading>
                <IconButton aria-label="add education item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />

            {eventItemsArray.length > 0 ? (
                <SimpleGrid flex="1" columns={[1, 1, 1, 2, 2, 3]} gap={4} mt={2}>
                    {eventItemsArray.sort((a, b) => new Date(a.timestamp as Date).getTime() - new Date(b.timestamp as Date).getTime()).map((item, index) => (
                        <EventFrame
                            key={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setEventItemsArray={setEventItemsArray}
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
            <ProfileEventModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setEventItemsArray={setEventItemsArray}
            />
        </>
    );
};

export default ProfileEvent;