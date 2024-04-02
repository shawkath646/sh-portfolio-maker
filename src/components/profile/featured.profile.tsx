"use client";
import { useState } from "react";
import {
    Heading,
    Divider,
    Flex,
    Text,
    useDisclosure,
    IconButton,
    Box,
    Center,
} from "@chakra-ui/react";
import ProfileFeaturedModal from "@/components/modal/featured.modal";
import FeaturedFrame from "@/components/profile/chunks/featuredFrame.chunks";
import { FeaturedItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileFeatured = ({ featuredItems }: { featuredItems: FeaturedItemType[] }) => {

    const [featuredItemsArray, setFeaturedItemsArray] = useState<FeaturedItemType[]>(featuredItems);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [currentItem, setCurrentItem] = useState<FeaturedItemType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Featured</Heading>
                <IconButton aria-label="add education item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            <Divider />
            {featuredItemsArray.length > 0 ? (
                <Flex wrap="wrap" gap={5} mt={5} justifyContent="center">
                    {featuredItemsArray.map((item, index) => (
                        <FeaturedFrame
                            key={index}
                            item={item}
                            onModalOpen={onOpen}
                            setCurrentItem={setCurrentItem}
                            setFeaturedItemsArray={setFeaturedItemsArray}
                        />
                    ))}
                </Flex>
            ) : (
                <Box as={Center} h="350px">
                    <Flex alignItems="center" gap={2}>
                        <IoIosWarning size={24} />
                        <Text fontSize="lg">No item added</Text>
                    </Flex>
                </Box>
            )}
            <ProfileFeaturedModal
                currentItem={currentItem}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentItem={setCurrentItem}
                setFeaturedItemsArray={setFeaturedItemsArray}
            />
        </>
    );
};

export default ProfileFeatured;