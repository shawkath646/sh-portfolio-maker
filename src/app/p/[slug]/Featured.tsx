"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardBody, Center, Heading, SimpleGrid, Stack, Text, Box } from "@chakra-ui/react";
import { FeaturedItemType } from "@/types/types";

const Featured = ({ featuredItems }: { featuredItems: FeaturedItemType[] }) => (
    <Box as="section" pt={10}>
        <Heading
            as={motion.h2}
            size={['xl', 'xl', 'lg']}
            textAlign="center"
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1,
                transition: {
                    duration: 1
                }
            }}
            viewport={{ once: true }}
        >
            Featured
        </Heading>
        <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={5} mt={5} justifyItems="center">
            {featuredItems.map((item, index) => (
                <Card
                    key={index}
                    as={motion.div}
                    maxW="sm"
                    bgColor={item.color}
                    h={["auto", "auto", 500]}
                    mx="auto"
                    whileHover={{
                        scale: 0.9,
                        transition: {
                            duration: 0.2,
                        }
                    }}
                    initial={{
                        opacity: 0,
                        y: 50
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1,
                            delay: index * 0.2
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <CardBody>
                        <Center>
                            {item.icon && (
                                <Image
                                    src={item.icon}
                                    alt="Dream Card Thumbnail"
                                    width={80}
                                    height={80}
                                    className="rounded"
                                />
                            )}
                        </Center>
                        <Heading size="lg" textAlign="center" mb={3}>{item.title}</Heading>
                        <Text>{item.description}</Text>
                    </CardBody>
                </Card>
            ))}
        </SimpleGrid>
    </Box>
);

export default Featured;
