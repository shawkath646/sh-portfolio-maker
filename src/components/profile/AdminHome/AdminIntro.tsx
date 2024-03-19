"use client";
import { useState } from "react";
import { Button, Heading, SimpleGrid, Stack, useToast, Divider, FormControl, FormLabel, Input } from '@chakra-ui/react'
import IntroTitle from "./AdminIntro/IntroTitle";
import PicUpload from "../../universal/PicUpload";
import IntroQuickLinks from "./AdminIntro/IntroQuickLinks";
import { updateIntroData, updateQuickLinksItem } from "@/lib/databaseActions/database";
import ComponentError from "@/components/error/ComponentError";


export default function AdminIntro({ fetchedData }) {

    const [introData, setIntroData] = useState(fetchedData.data.intro);
    const [quickLinksData, setQuickLinksData] = useState(fetchedData.data.quickLinks);

    const [selectedImage, setSelectedImage] = useState(null);

    const toast = useToast();

    const handleImageChange = (base64) => {
        setIntroData(prev => ({...prev, image: ''}));
        setSelectedImage(base64);
    }

    const handleImageRemove = () => {
        setSelectedImage(null);
        setIntroData(prev => ({...prev, image: ''}));
    }

    const handleSubmit = async() => {
        const updatePromise = new Promise(async (resolve, reject) => {
            try {
              await updateIntroData(introData, selectedImage);
              if (fetchedData.data.quickLinks !== quickLinksData) await updateQuickLinksItem(quickLinksData);
              resolve(200);
            } catch (error) {
              reject(error);
            }
          });          

        toast.promise(updatePromise, {
            success: { title: 'Successfully updated', description: 'Looks great' },
            error: { title: 'Failed to update data', description: 'Something wrong' },
            loading: { title: 'Updating data', description: 'Please wait' },
        })
    }

    return (
        <section className="mb-16">
            {fetchedData.status.type ? (
                <>
                    <Heading my={2} textAlign="center">Intro</Heading>
                    <Divider />
                    <SimpleGrid minChildWidth='400px' gap={10} mt={10} mb={4}>
                        <Stack>
                            <FormControl mb={5}>
                                <FormLabel>Full Name :</FormLabel>
                                <Input
                                    value={introData.fullName}
                                    onChange={event =>
                                        setIntroData(prev => ({...prev, fullName: event.target.value}))
                                    }
                                />
                            </FormControl>

                            <IntroTitle
                                title={introData.title}
                                setIntroData={setIntroData}
                            />
                        </Stack>
                        <IntroQuickLinks
                            quickLinks={quickLinksData}
                            setQuickLinks={setQuickLinksData}
                        />
                        <Stack align="center">
                            <PicUpload
                                currentImage={introData.image}
                                onRemove={handleImageRemove}
                                selectedImage={selectedImage}
                                onChange={handleImageChange}
                                label="Intro Image :"
                            />
                            <Button
                                colorScheme='teal'
                                variant='solid'
                                onClick={handleSubmit}
                                w={140}
                            >
                                Update
                            </Button>
                        </Stack>
                    </SimpleGrid>
                </>
            ) : (
                <ComponentError message={fetchedData.status.message} />
            )}
        </section>
    );
}