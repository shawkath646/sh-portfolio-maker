"use client";
import NextImage from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
    Button,
    Box,
    useDisclosure,
} from "@chakra-ui/react";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import { MiniGalleryItemType } from "@/types/types";
import removeMiniGalleryItem from "@/actions/database/home/removeMiniGalleryItem";

const MiniGalleryFrame: React.FC<{
    item: MiniGalleryItemType,
    setMiniGalleryItemsArray: Dispatch<SetStateAction<MiniGalleryItemType[]>>;
}> = ({
    item,
    setMiniGalleryItemsArray,
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <>
                <Box>
                    <NextImage
                        src={item}
                        alt="Mini Gallery item"
                        height={140}
                        width={140}
                        style={{
                            height: "140px",
                            width: "140px",
                            objectFit: "cover",
                            borderRadius: "5px"
                        }}
                    />
                    <Button
                        w="full"
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        mt={2}
                        onClick={onOpen}
                    >
                        Remove
                    </Button>
                </Box>
                <ItemDeleteModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={async() => {
                        await removeMiniGalleryItem(item.id);
                        setMiniGalleryItemsArray(prev => prev.filter(prevItem => prevItem !== item))
                    }}
                />
            </>
        );
    };

export default MiniGalleryFrame;