"use client";
import { useState } from "react";
import { Box, Button, Divider, FormControl, FormLabel, GridItem, Heading, Input, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import PicUpload from "../../universal/PicUpload";
import AdminContactItem from "./AdminContacts/AdminContactItem";
import { AnimatePresence, motion } from "framer-motion";
import randomId from "@/lib/randomId";
import { addSecondaryContactsItems, removeSecondaryContactsItems, updatePrimaryContactsData } from "@/lib/databaseActions/database";
import ColorSelect from "@/components/universal/ColorSelect";




export default function AdminContacts({ data }) {
    const initialSecondaryData = {
        id: "",
        image: "",
        href: "",
        color: "",
    }

    const [contactsData, setContactsData] = useState(data);

    const [secondaryData, setSecondaryData] = useState(initialSecondaryData);

    const [primarySelectedImage, setPrimarySelectedImage] = useState(null);

    const toast = useToast();


    const handleAdd = () => {
        setContactsData((prev) => ({
            ...prev,
            secondary: [...prev.secondary, { ...secondaryData, id: randomId(16) }],
        }));
        setSecondaryData(initialSecondaryData);
    };

    const handlePrimaryImageRemove = () => {
        setPrimarySelectedImage(null);
        setContactsData(prev => ({...prev, primary: {
            ...prev.primary,
            image: ""
        }}));
    }

    const handleUpdate = async() => {
        
        const updatePromise = new Promise(async(resolve, reject) => {
            try {
                if (data.primary !== contactsData.primary) await updatePrimaryContactsData(contactsData.primary, primarySelectedImage);

                if (data.secondary !== contactsData.secondary) {
                    const newItems = contactsData.secondary.filter(newItem => !data.secondary.find(oldItem => oldItem.id === newItem.id));
                    const removedItems = data.secondary.filter(oldItem => !contactsData.secondary.find(newItem => newItem.id === oldItem.id));
                    const removedItemsId = removedItems.map(e => e.id);

                    removedItemsId.length > 0 && await removeSecondaryContactsItems(removedItemsId);
                    newItems.length > 0 && await addSecondaryContactsItems(newItems);
                    
                }

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

    };

    const handleRemove = (data) => {
        const filteredSecondary = contactsData.secondary.filter(item => item !== data);
    
        setContactsData(prevData => ({
            ...prevData,
            secondary: filteredSecondary,
        }));
    };    


    return (
        <section className="mb-16">
            <Heading my={2} textAlign="center">Contacts</Heading>
            <Divider />
            <SimpleGrid minChildWidth={400} mt={3} gap={2} column={3}>
                <GridItem as={Stack} direction="row" colSpan={1}>
                    <Box>
                        <Text fontSize="2xl" ml={10} mt={5}>Primary</Text>
                        <FormControl>
                            <FormLabel>Text :</FormLabel>
                            <Input
                                value={contactsData.primary.text}
                                onChange={event =>
                                    setContactsData(prev => ({
                                        ...prev,
                                        primary: {
                                        ...prev.primary,
                                        text: event.target.value
                                        }
                                    }))
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Link :</FormLabel>
                            <Input
                                value={contactsData.primary.href}
                                onChange={event =>
                                    setContactsData(prev => ({
                                        ...prev,
                                        primary: {
                                        ...prev.primary,
                                        href: event.target.value
                                        }
                                    }))
                                }
                            />
                        </FormControl>
                        <PicUpload
                            label="Logo :"
                            currentImage={contactsData.primary.image}
                            selectedImage={primarySelectedImage}
                            onChange={setPrimarySelectedImage}
                            onRemove={handlePrimaryImageRemove}
                        />
                        <Text fontSize="2xl" ml={10} mt={3}>Secondary</Text>
                        <FormLabel>Link :</FormLabel>
                        <Input
                            placeholder="Ex. https://facebook.com/abcd"
                            value={secondaryData.href}
                            onChange={event => setSecondaryData(prev => ({...prev, href: event.target.value}))}
                            mb={2}
                        />
                        <Stack direction="row">
                            <PicUpload
                                currentImage={secondaryData.image}
                                onChange={event => setSecondaryData(prev => ({...prev, image: event}))}
                                label="Icon :"
                                onRemove={() => setSecondaryData(prev => ({...prev, image: ''}))}
                            />
                            <Stack w={260}>
                                <ColorSelect
                                    value={secondaryData.color}
                                    onChange={color => setSecondaryData(prev => ({...prev, color}))}
                                />
                                <Button
                                    isDisabled={!secondaryData.href || !secondaryData.color || !secondaryData.image}
                                    mr={5}
                                    onClick={handleAdd}
                                >
                                    Add
                                </Button>
                                <Button
                                    colorScheme='teal'
                                    variant='solid'
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                    <Divider orientation='vertical' h="full" mx={3} />
                </GridItem>
                <GridItem colSpan={2}>
                    <SimpleGrid minChildWidth={200} columnGap={30} rowGap={20} mt={10} mb={5}>
                        <AnimatePresence>
                            {contactsData.secondary.length > 0 && contactsData.secondary.map((data, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <AdminContactItem data={data} handleRemove={handleRemove} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </SimpleGrid>
                </GridItem>  
            </SimpleGrid>   
        </section>
    );
}