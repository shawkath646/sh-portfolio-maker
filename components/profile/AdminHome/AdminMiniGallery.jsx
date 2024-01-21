"use client";
import Image from "next/image";
import { useState } from "react";
import { Button, Center, Divider, Heading, List, ListItem, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import GalleryPicUpload from "../../universal/GalleryPicUpload";
import { addMiniGalleryItems, removeMiniGalleryItems } from "@/lib/database";


export default function AdminMiniGallery({ data }) {

    const [miniGalleryData, setMiniGalleryData] = useState(data);

    const toast = useToast();

    const handleImageRemove = (selected) => {
        const filteredData = miniGalleryData.filter((image) => {
          return image !== selected;
        });
      
        setMiniGalleryData(filteredData);
    };

    const handleUpdate = async() => {

        const newItems = miniGalleryData.filter(newItem => !data.find(oldItem => oldItem.id === newItem.id));
        const removedItems = data.filter(oldItem => !miniGalleryData.find(newItem => newItem.id === oldItem.id));
        const removedItemsId = removedItems.map(e => e.id);

        const updatePromise = new Promise(async(resolve, reject) => {
            try {
                removedItemsId.length > 0 && await removeMiniGalleryItems(removedItemsId);
                newItems.length > 0 && await addMiniGalleryItems(newItems);
                resolve(200);
            } catch (error) {
                console.log(error);
                reject(500);
            }
        });

        toast.promise(updatePromise, {
            success: { title: 'Updated successfully', description: 'Looks great' },
            error: { title: 'Failed to update', description: 'Something wrong' },
            loading: { title: 'Updating dreams', description: 'Please wait' },
        });
    }

    return (
        <section className="mb-16">
            <Heading marginY={2} textAlign="center">Mini Gallery</Heading>

            <Divider />

            <List as={SimpleGrid} columns={[ 2, 2, 4, 5, 6, 7 ]} gap={18} my={10}>
                <AnimatePresence>
                    {miniGalleryData.length > 0 && miniGalleryData.map((data, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ListItem as={Stack} key={index} spacing={2} width={180}>
                                <Center h={180}>
                                    <Image src={data.image} alt="Mini Gallery Pic" width={180} height={150} className="rounded" /> 
                                </Center>
                                <Button
                                    variant="outline"
                                    colorScheme="red"
                                    size="sm"
                                    mt={1}
                                    onClick={() => handleImageRemove(data)}
                                >
                                    Remove
                                </Button>
                            </ListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <ListItem as={Stack} align="center" my="auto">
                    <GalleryPicUpload onChange={setMiniGalleryData} width={180} height={180}  />
                    <Button
                        colorScheme='teal'
                        variant='solid'
                        onClick={handleUpdate}
                        w="full"
                    >
                        Update
                    </Button>
                </ListItem>
            </List>
        </section>
    );
}