"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Box, useDisclosure, Button } from "@chakra-ui/react";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import { GalleryItemType } from "@/types/types";
import removeGalleryItem from "@/actions/database/gallery/removeGalleryItem";

const GalleryFrame: React.FC<{
    photo: GalleryItemType,
    setGalleryItemsArray: Dispatch<SetStateAction<GalleryItemType[]>>,
}> = ({
    photo,
    setGalleryItemsArray
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box
                padding="15px"
                bgColor="#fff"
                boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
                h="280px"
                w="180px"
            >
                <Image
                    src={photo}
                    alt="gallery item"
                    height={220}
                    width={150}
                    style={{ height: "220px", width: "150px", objectFit: "cover", objectPosition: "center" }}
                />
                <Button
                    mt={1}
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    w="full"
                    onClick={onOpen}
                >
                    Remove
                </Button>
            </Box>
            <ItemDeleteModal
                isOpen={isOpen}
                onClose={onClose}
                onDelete={async() => {
                    await removeGalleryItem(photo.id);
                    setGalleryItemsArray(prev => prev.filter(prevItem => prevItem !== photo));
                }}
            />
        </>
    );
};

export default GalleryFrame;