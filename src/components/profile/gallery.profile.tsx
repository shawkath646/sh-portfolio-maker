"use client";
import { useState } from "react";
import {
    useDisclosure,
    Box,
    Text,
    Flex,
    IconButton,
    Center,
} from "@chakra-ui/react";
import CollectionContainer from "@/components/profile/gallery.chunks/collectionContainer.chunks";
import ProfileGalleryModal from "@/components/modal/gallery.modal";
import { GalleryCollectionType, GalleryItemType, GalleryDataType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileGallery: React.FC<{ galleryData: GalleryDataType }> = ({ galleryData }) => {

    const [galleryItemsArray, setGalleryItemsArray] = useState<GalleryItemType[]>(galleryData.galleryItems);
    const [galleryCollectionArray, setGalleryCollectionArray] = useState<GalleryCollectionType[]>(galleryData.collection);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentCollection, setCurrentCollection] = useState<GalleryCollectionType | null>(null);

    return (
        <>
            <Flex justifyContent="end">
                <IconButton aria-label="add project item" icon={<FaPlus />} onClick={onOpen} />
            </Flex>
            {galleryCollectionArray.length > 0 ? galleryCollectionArray.map((collection, index) => (
                <CollectionContainer
                    key={index}
                    collection={collection}
                    galleryItemsArray={galleryItemsArray}
                    setCurrentCollection={setCurrentCollection}
                    setGalleryCollectionArray={setGalleryCollectionArray}
                    setGalleryItemsArray={setGalleryItemsArray}
                />
            )) : (
                <Box as={Center} h="350px">
                    <Flex alignItems="center" gap={2}>
                        <IoIosWarning size={24} />
                        <Text fontSize="lg">No collection added</Text>
                    </Flex>
                </Box>
            )}
            <ProfileGalleryModal
                currentCollection={currentCollection}
                isOpen={isOpen}
                onClose={onClose}
                setCurrentCollection={setCurrentCollection}
                setGalleryCollectionArray={setGalleryCollectionArray}
            />
        </>
    );
};

export default ProfileGallery;