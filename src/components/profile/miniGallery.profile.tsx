"use client";
import { useState } from "react";
import {
    Heading,
    Divider,
    Flex,
    useToast,
} from "@chakra-ui/react";
import GalleryAddItem from "@/components/galleryAddItem";
import MiniGalleryFrame from "@/components/profile/chunks/miniGalleryFrame.chunks";
import { v4 as uuidv4 } from 'uuid';
import { FileObjectType, MiniGalleryItemType } from "@/types/types";
import addMiniGalleryItem from "@/actions/database/home/addMiniGalleryItem";


const ProfileMiniGallery = ({ miniGalleryItems }: { miniGalleryItems: MiniGalleryItemType[] }) => {

    const [miniGalleryItemsArray, setMiniGalleryItemsArray] = useState(miniGalleryItems);

    const toast = useToast();

    const onAddItem = (fileObject: FileObjectType[]) => {
        const response = async () => {
            const newArray: MiniGalleryItemType[] = [];
            const promises = fileObject.map(async (object) => {
                const newObject: MiniGalleryItemType = {
                    ...object,
                    id: uuidv4()
                };
                newArray.push(newObject);
                await addMiniGalleryItem(newObject);
            });
    
            await Promise.all(promises);
            setMiniGalleryItemsArray(prev => prev.concat(newArray));
        };

        toast.promise(response(), {
            success: { title: 'Mini gallery item added successfully' },
            error: { title: 'Something wrong', },
            loading: { title: 'Adding mini gallery item...' },
        });
    };

    return (
        <>
            <Heading as="h5" size="lg" mt={10} mb={1}>Mini Gallery</Heading>
            <Divider />
            <Flex wrap="wrap" gap={4} mt={4} justifyContent="center">
                {miniGalleryItemsArray.map((item, index) => (
                    <MiniGalleryFrame
                        key={index}
                        item={item}
                        setMiniGalleryItemsArray={setMiniGalleryItemsArray}
                    />
                ))}
                <GalleryAddItem
                    onItemAdd={onAddItem}
                    maxLength={15}
                    length={miniGalleryItemsArray.length}
                />
            </Flex>
        </>
    );
};

export default ProfileMiniGallery;