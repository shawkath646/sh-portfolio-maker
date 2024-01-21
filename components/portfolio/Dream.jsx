//ready and optimized
"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Card, CardBody, Center, Heading, List, SimpleGrid, Skeleton, Stack, Text, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedComponent from "../universal/AnimateComponent";
import ComponentError from "../error/ComponentError";
import { getDreamItems } from "@/lib/database";



export default function Dream({ username }) {

    const [data, setData] = useState({});
    const [status, setStatus] = useState({
        name: 'loading',
        type: true,
        message: ''
    });

    useEffect(() => {
        getDreamItems(username)
        .then(recievedData => {
            if (recievedData.status.type) {
                setData(recievedData.data);
                setStatus({
                    name: 'success',
                    type: 'true'
                });
            } else {
                setStatus({
                    name: 'error',
                    type: recievedData.status.type,
                    message: recievedData.status.message
                });
            }
        }).catch(error => {
            setStatus({
                name: 'error',
                type: false,
                message: error.toString()
            })
        })
    }, []);


    return (
        <section className="pt-16">
            {status.name === "error" ? (
                <ComponentError message={status.message} />
            ) : (
                <>
                    {(status.name === 'loading' || data.dreamData?.length > 0) && (
                        <AnimatedComponent
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                            }}
                        >
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { duration: 2, delay: 0.5 } },
                                }}
                                className="px-2"
                            >
                
                                <AnimatedComponent
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: (index) => ({
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.5, delay: 1 + index * 0.5 }
                                        }),
                                    }}
                                >
                                    <Stack spacing={5} textAlign="center">
                                        {data.showHeading && (
                                            <>
                                                <Skeleton isLoaded={status.name !== 'loading'} maxW={200} height={12} mx="auto">
                                                <Heading as='h2' size='2xl'>Dream</Heading>
                                                </Skeleton>
                                                <Skeleton isLoaded={status.name !== 'loading'}  maxW={800} height={6} mx="auto">
                                                    <Text fontSize="lg">All our dreams can come true, if we have the courage to pursue them.</Text>
                                                </Skeleton>
                                            </>
                                        )}
                                    </Stack>
                                </AnimatedComponent>
                                <List as={SimpleGrid} columns={[1, 1, 2, 2, 3]} gap={5} mt={5}>
                                    {status.name === 'loading' ? (
                                        <>
                                            {[...Array(3)].map((_, k) => (
                                                <Card key={k} maxW="sm" h={500} w={350} mx="auto">
                                                    <CardBody as={Stack} mt={3} spacing={2}>
                                                        <Center>
                                                            <SkeletonCircle size='20' />
                                                        </Center>
                                                        <SkeletonText mt='4' noOfLines={18} spacing='3' skeletonHeight='2' />
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </>
                                    ) : (
                                        <AnimatePresence>
                                            {data.dreamData.map((data, index) => (
                                                <AnimatedComponent
                                                    key={index}
                                                    variants={{
                                                        hidden: { opacity: 0, y: 20 },
                                                        visible: (index) => ({
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: { duration: 0.5, delay: 1 + index * 0.5 }
                                                        }),
                                                    }}
                                                >
                                                    <Card maxW="sm" bgColor={data.color} h={500} mx="auto" className="hover:scale-90 transition-all">
                                                        <CardBody as={Stack} mt={3} spacing={2}>
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
                                                        </CardBody>
                                                    </Card>
                                                </AnimatedComponent>
                                            ))}
                                        </AnimatePresence>
                                    )}
                                </List>
                            </motion.div>
                        </AnimatedComponent>
                    )}
                </>
            )}
        </section>
    );
}
