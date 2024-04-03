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
    useToast,
    useBoolean,
    Skeleton,
} from "@chakra-ui/react";
import GalleryAddItem from "@/components/galleryAddItem";
import ImageFrame from "@/components/profile/chunks/galleryFrame.chunks";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import addGalleryItem from "@/actions/database/gallery/addGalleryItem";
import removeGalleryCollection from "@/actions/database/gallery/removeGalleryCollection";
import { v4 as uuidv4 } from 'uuid';
import { FileObjectType, GalleryCollectionType, GalleryItemType } from "@/types/types";
import removeGalleryItem from "@/actions/database/gallery/removeGalleryItem";


const CollectionContainer: React.FC<{
    collection: GalleryCollectionType;
    galleryItemsArray: GalleryItemType[];
    setGalleryItemsArray: Dispatch<SetStateAction<GalleryItemType[]>>;
    setGalleryCollectionArray: Dispatch<SetStateAction<GalleryCollectionType[]>>;
    setCurrentCollection: Dispatch<SetStateAction<GalleryCollectionType | null>>;
    onModalOpen: () => void;
}> = ({
    collection,
    galleryItemsArray,
    setGalleryItemsArray,
    setGalleryCollectionArray,
    setCurrentCollection,
    onModalOpen
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();
        const filteredItems = galleryItemsArray.filter(item => item.collectionId === collection.collectionId);
        const [isLoading, setLoading] = useBoolean(false);

        const toast = useToast();

        const onItemAdd = async (fileObject: FileObjectType[]) => {
            setLoading.on();
            for (const object of fileObject) {
                const newObject: GalleryItemType = {
                    ...object,
                    collectionId: collection.collectionId,
                    id: uuidv4()
                };
                const response = await addGalleryItem(newObject);
                toast({
                    title: response.message,
                    status: response.status as "success" | "error",
                    duration: 9000,
                    isClosable: true,
                });
                setGalleryItemsArray(prev => [...prev, newObject]);
            };
            setLoading.off();
        };


        return (
            <>
                <Box mb={8}>
                    <Flex alignItems="center" gap={4} mb={4}>
                        <Heading as="h2" size="lg">{collection.name}</Heading>
                        <ButtonGroup>
                            <Button
                                onClick={() => {
                                    setCurrentCollection(collection);
                                    onModalOpen();
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
                    <Flex wrap="wrap" gap={4} justifyContent={["center", "unset"]} alignItems="center">
                        {filteredItems.map((photo, index) => <ImageFrame key={index} photo={photo} setGalleryItemsArray={setGalleryItemsArray} />)}
                        {isLoading ? (
                            <Skeleton h="140px" w="140px" />
                        ) : (
                            <GalleryAddItem onItemAdd={onItemAdd} />
                        )}
                    </Flex>
                </Box>
                <ItemDeleteModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={async() => {
                        const filteredItems = galleryItemsArray.filter(item => item.collectionId === collection.collectionId);
                        for (const item of filteredItems) await removeGalleryItem(item.id);
                        setGalleryItemsArray(prev => prev.filter(prevItem => !filteredItems.includes(prevItem)));
                        const response = await removeGalleryCollection(collection.collectionId);
                        setGalleryCollectionArray(prev => prev.filter(prevCollection => prevCollection !== collection));
                        toast({
                            title: response.message,
                            status: response.status as "success" | "error",
                            duration: 9000,
                            isClosable: true,
                        });
                    }}
                />
            </>
        );
    };

export default CollectionContainer;