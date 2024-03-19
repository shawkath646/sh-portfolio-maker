"use client";
import Image from "next/image";
import { useState } from "react";
import { Box, Button, Card, CardBody, Center, Checkbox, Divider, FormLabel, GridItem, Heading, Input, List, SimpleGrid, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import PicUpload from "../../universal/PicUpload";
import { addDreamData, removeDreamData } from "@/lib/databaseActions/database";
import randomId from "@/lib/randomId";
import ColorSelect from "@/components/universal/ColorSelect";
import { PiSmileySad } from "react-icons/pi";




export default function AdminDream({ fetchedData }) {

    const initialValue = {
        id: '',
        title: '',
        description: '',
        image: '',
        color: '',
    }

    const [dreamData, setDreamData] = useState(fetchedData.data.dreamData);

    const [showHeading, setShowHeading] = useState(fetchedData.data.showHeading);

    const [value, setValue] = useState(initialValue);

    const toast = useToast();

    const removeCard = (item) => {
        const updatedItems = dreamData.filter(currentItem => currentItem !== item);
        setDreamData(updatedItems);
    };

    const handleAdd = () => {
        setDreamData(prev => [...prev, { ...value, id: randomId(16) }]);
        setValue(initialValue);
    }

    const handleUpdate = async () => {
        const updatePromise = new Promise(async(resolve, reject) => {
            try {
                const addedItems = dreamData.filter(newItem => !fetchedData.data.dreamData.some(oldItem => oldItem.id === newItem.id));
                const removedIds = fetchedData.data.dreamData.filter(oldItem => !dreamData.some(newItem => newItem.id === oldItem.id)).map(item => item.id);

                removedIds.length > 0 && await removeDreamData(removedIds);
                await addDreamData(addedItems, showHeading);

                resolve(200);
            } catch (error) {
                reject(error);
            }
        })
      
        toast.promise(updatePromise, {
          success: { title: 'Updated successfully', description: 'Looks great' },
          error: { title: 'Failed to update', description: 'Something wrong' },
          loading: { title: 'Updating dreams', description: 'Please wait' },
        });
      
    };

    return (
        <section className="mb-16">
            <Heading my={2} textAlign="center">Dream</Heading>
            <Divider />
            
            <SimpleGrid columns={[1, 1, 1, 3, 3]} mt={12} gap={5} mb={5}>
                <GridItem as={Stack} direction="row">
                    <Box minW={420} mx="auto">
                        <FormLabel>Title :</FormLabel>
                        <Input
                            type="text"
                            value={value.title}
                            onChange={event =>
                            setValue(prev =>
                                ({...prev, title: event.target.value}))
                            } 
                        />
                        <FormLabel>Description :</FormLabel>
                        <Textarea
                            type="text"
                            value={value.description}
                            rows={8}
                            resize='none'
                            onChange={event =>
                            setValue(prev =>
                                ({...prev, description: event.target.value}))}
                        />
                        <Stack direction="row" w="full" mt={5} align="end" spacing={10}>
                            <Stack>
                                <Checkbox isChecked={showHeading} onChange={event => setShowHeading(event.target.checked)}>
                                    <Text>Show heading</Text>
                                </Checkbox>
                                <PicUpload
                                    selectedImage={value.image}
                                    onChange={e =>
                                        setValue(prev => ({...prev, image: e}))
                                    }
                                    label="Logo :"
                                    onRemove={() => 
                                        setValue(prev => ({ ...prev, image: '' }))
                                    }
                                />
                            </Stack>
                            <Stack minW={200}>
                                <ColorSelect
                                    value={value.color}
                                    onChange={color =>
                                        setValue(prev =>
                                            ({...prev, color})
                                        )
                                    }
                                    w="full"
                                />
                                <Button
                                    onClick={handleAdd}
                                    isDisabled={value.title.length < 1 || value.description.length < 1}
                                    w="full"
                                >
                                    Add
                                </Button>
                                <Button
                                    colorScheme='teal'
                                    variant='solid'
                                    onClick={handleUpdate}
                                    w="full"
                                >
                                    Update
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                    <Divider orientation='vertical' h="full" mx={3} />
                </GridItem>
                <GridItem colSpan={2}>
                    {dreamData.length > 0 ? (
                        <List as={SimpleGrid} columns={[1, 1, 1, 1, 2]} gap={5}>
                            <AnimatePresence>
                                {dreamData.map((data, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card maxW="sm" bgColor={data.color} h={500} minW={310} mx="auto">
                                            <CardBody as={Stack} mt={3}>
                                                <div className="h-[400px] space-y-2">
                                                    <Center>
                                                        {data.image && (
                                                            <Image
                                                                src={data.image}
                                                                alt="Dream Card Thumbnail"
                                                                width={80}
                                                                height={80}
                                                                className="rounded"
                                                            />
                                                        )}
                                                    </Center>
                                                    <Heading size="lg" textAlign="center">{data.title}</Heading>
                                                    <Text>{data.description}</Text>
                                                </div>
                                                <Button variant="outline" colorScheme="red" onClick={() => removeCard(data)} w="full">Remove</Button>
                                            </CardBody>
                                        </Card>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </List>
                    ) : (
                        <Box as={Center} h={[100, 100, "full"]}>
                            <Stack direction="row" alignItems="center">
                                <Text color="gray">No dream items have been found. Let's begin by adding one.</Text>
                                <PiSmileySad size={30} />
                            </Stack>
                        </Box>
                    )}
                </GridItem>
            </SimpleGrid>
        </section>
    );
}