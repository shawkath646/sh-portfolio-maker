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
import ProfileReawardAndAchievementModal from "@/components/modal/reaward&achievement.modal";
import ReawardAndAchievementFrame from "@/components/profile/chunks/reaward&achievementFrame.chunks";
import { ReawardAndAchievementItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileReawardAndAchevement: React.FC<{ reawardAndAchievementItems: ReawardAndAchievementItemType[] }> = ({ reawardAndAchievementItems }) => {

    const [reawardAndAchievementItemsArray, setReawardAndAchievementItemsArray] = useState<ReawardAndAchievementItemType[]>(reawardAndAchievementItems);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentItem, setCurrentItem] = useState<ReawardAndAchievementItemType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Reaward & Achievement</Heading>
                <IconButton aria-label="add reaward & achievement item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />

            {reawardAndAchievementItemsArray.length > 0 ? (
                <SimpleGrid flex="1" columns={[1, 1, 1, 2, 2, 3]} gap={4} mt={2}>
                    {reawardAndAchievementItemsArray.map((item, index) => (
                        <ReawardAndAchievementFrame
                            key={index}
                            index={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setReawardAndAchievementItemsArray={setReawardAndAchievementItemsArray}
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
            <ProfileReawardAndAchievementModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setReawardAndAchievementArray={setReawardAndAchievementItemsArray}
            />
        </>
    );
};

export default ProfileReawardAndAchevement;