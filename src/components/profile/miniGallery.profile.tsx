"use client";
import NextImage from "next/image";
import { Fragment, useState } from "react";
import {
    Heading,
    Divider,
    Flex,
    Box,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import GalleryAddItem from "@/components/galleryAddItem";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import { v4 as uuidv4 } from 'uuid';
import { MiniGalleryItemType } from "@/types/types";


const ProfileMiniGallery = ({ miniGalleryItems }: { miniGalleryItems: MiniGalleryItemType[] }) => {

    const [miniGalleryItemsArray, setMiniGalleryItemsArray] = useState(miniGalleryItems);

    return (
        <>
            <Heading as="h5" size="lg" mt={10} mb={1}>Mini Gallery</Heading>
            <Divider />
            <Flex wrap="wrap" gap={4} mt={4} justifyContent="center">
                {miniGalleryItemsArray.map((item, index) => {
                    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
                    return (
                        <Fragment key={index}>
                            <Box>
                                <NextImage
                                    src={item}
                                    alt="Mini Gallery item"
                                    height={item.height}
                                    width={item.width}
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
                                    onClick={onAlertOpen}
                                >
                                    Remove
                                </Button>
                            </Box>
                            <ItemDeleteModal
                                isOpen={isAlertOpen}
                                onClose={onAlertClose}
                                onDelete={() => setMiniGalleryItemsArray(prev => prev.filter(prevItem => prevItem !== item))}
                            />
                        </Fragment>
                    );
                })}
                <GalleryAddItem
                    onItemAdd={(fileObject) => {
                        const newArray: MiniGalleryItemType[] = [];
                        fileObject.forEach((object) => {
                            const newObject: MiniGalleryItemType = {
                                ...object,
                                id: uuidv4()
                            };
                            newArray.push(newObject);
                        });
                        setMiniGalleryItemsArray(prev => prev.concat(newArray));
                    }}
                    maxLength={15}
                    length={miniGalleryItemsArray.length}
                />
            </Flex>
        </>
    );
};

export default ProfileMiniGallery;