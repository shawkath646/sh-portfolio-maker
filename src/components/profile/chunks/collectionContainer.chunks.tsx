"use client";
import { Dispatch, SetStateAction } from "react";
import {
    Heading,
    Divider,
    Button,
    useDisclosure,
    Box,
    Flex,
    ButtonGroup,
} from "@chakra-ui/react";
import GalleryAddItem from "@/components/galleryAddItem";
import ImageFrame from "@/components/profile/chunks/imageFrame.chunks";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import { v4 as uuidv4 } from 'uuid';
import { GalleryCollectionType, GalleryItemType } from "@/types/types";


const CollectionContainer: React.FC<{
    collection: GalleryCollectionType;
    galleryItemsArray: GalleryItemType[];
    setGalleryItemsArray: Dispatch<SetStateAction<GalleryItemType[]>>;
    setGalleryCollectionArray: Dispatch<SetStateAction<GalleryCollectionType[]>>;
    setCurrentCollection: Dispatch<SetStateAction<GalleryCollectionType | null>>
}> = ({
    collection,
    galleryItemsArray,
    setGalleryItemsArray,
    setGalleryCollectionArray,
    setCurrentCollection
}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box mb={8}>
                <Flex alignItems="center" gap={4} mb={4}>
                    <Heading as="h2" size="lg">{collection.name}</Heading>
                    <ButtonGroup>
                        <Button
                            onClick={() => {
                                setCurrentCollection(collection);
                                onOpen();
                            }}
                            variant="outline"
                            size="sm"
                            colorScheme="green"
                        >
                            Edit
                        </Button>
                        <Button onClick={onOpen} variant="outline" size="sm" colorScheme="red">Remove</Button>
                    </ButtonGroup>
                </Flex>
                <Divider my={4} />
                {(() => {
                    const filteredItems = galleryItemsArray.filter(item => item.collectionId === collection.collectionId);
                    return (
                        <Flex wrap="wrap" gap={4} justifyContent={["center", "unset"]} alignItems="center">
                            {filteredItems.map((photo, index) => <ImageFrame key={index} photo={photo} setGalleryItemsArray={setGalleryItemsArray} />)}
                            <GalleryAddItem
                                onItemAdd={(fileObject) => {
                                    const newArray: GalleryItemType[] = [];
                                    fileObject.forEach((object) => {
                                        const newObject: GalleryItemType = {
                                            ...object,
                                            collectionId: collection.collectionId,
                                            id: uuidv4()
                                        };
                                        newArray.push(newObject);
                                    });
                                    setGalleryItemsArray(prev => prev.concat(newArray));
                                }}
                            />
                        </Flex>
                    );
                })()}
            </Box>
            <ItemDeleteModal
                isOpen={isOpen}
                onClose={onClose}
                onDelete={() => {
                    const filteredItems = galleryItemsArray.filter(item => item.collectionId === collection.collectionId);
                    setGalleryItemsArray(prev => prev.filter(prevItem => !filteredItems.includes(prevItem)));
                    setGalleryCollectionArray(prev => prev.filter(prevCollection => prevCollection !== collection));
                }}
            />
        </>
    );
};

export default CollectionContainer;