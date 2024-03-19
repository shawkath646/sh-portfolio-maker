"use client";
import { motion } from "framer-motion";
import { Box, Container, Flex, Text, Heading, GridItem, Grid, Icon } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import formatDate from "@/utils/formatDate";
import { ProjectsDataType } from "@/types/types";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";




export default function ProjectsBox({ projectsData, username }: { projectsData: ProjectsDataType[], username: string }) {

    return (
        <Box
            as="main"
            w="full"
            bgColor="#f1f5f9"
        >
            <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                    {projectsData.map((item, index) => (
                        <GridItem
                            key={index}
                            as={motion.div}
                            whileHover={{
                                scale: 0.95,
                                transition: {
                                    duration: 0.2
                                }
                            }}
                            initial={{
                                scale: 0.2,
                                opacity: 0
                            }}
                            whileInView={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    duration: 1
                                }
                            }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/p/${username}/projects/${item.id}`} _hover={{ textDecoration: "none" }}>
                                <Box p={4} borderWidth="1px" boxShadow="md" bg="#fff">
                                    <Box position="relative" height="120px" mb={38}>
                                        <Image src={item.images[0]} alt={`${item.name} cover`} fill style={{ borderRadius: "0.7rem" }} />

                                        <Box position="absolute" bottom={0} left="50%" transform="translateX(-50%)" mb={-27} borderRadius="full" overflow="hidden" border="4px solid white">
                                            <Image src={item.icon} alt={`${item.name} icon`} height={70} width={70} style={{ height: "67px", width: "70px" }} />
                                        </Box>
                                    </Box>

                                    <Heading as="h3" fontSize="xl" mb={2}>{item.name}</Heading>
                                    <Flex alignItems="center" gap={1.5} mb={2} fontSize="sm">
                                        <Text fontWeight={600}>Type:</Text>
                                        <Text>{item.type}</Text>
                                    </Flex>
                                    <Flex alignItems="center" gap={1.5} mb={2} fontSize="sm">
                                        <Text fontWeight={600}>Starts:</Text>
                                        <Text>{formatDate(item.startsFrom as Date)}</Text>
                                    </Flex>
                                    <Flex alignItems="center" gap={1.5} mb={2} fontSize="sm">
                                        <Text fontWeight={600}>{item.endsOn ? "Ends:" : "Present"}</Text>
                                        {item.endsOn && <Text>{formatDate(item.endsOn as Date)}</Text>}
                                    </Flex>
                                    <Link href={item.liveLink} isExternal fontSize="sm" mr={2}><Icon as={FaExternalLinkAlt} mr={1} />Live</Link>
                                    <Link href={item.sourceLink} isExternal fontSize="sm"><Icon as={FaGithub} mr={1} />Source</Link>
                                </Box>
                            </Link>
                        </GridItem>
                    ))}
                </Grid>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                    mb={5}
                >
                    <Link
                        href={`/p/${username}/portfolio`}
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        color="#0891b2"
                        _hover={{
                            textDecoration: "none",
                            color: "#0e7490",
                            transition: "color 0.3s ease"
                        }}
                        fontWeight={500}
                    >
                        <IoIosArrowBack size={20} />
                        <Text>Prev: Portfolio</Text>
                    </Link>
                    <Link
                        href={`/p/${username}/gallery`}
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        color="#0891b2"
                        _hover={{
                            textDecoration: "none",
                            color: "#0e7490",
                            transition: "color 0.3s ease"
                        }}
                        fontWeight={500}
                        mt={3}
                        mb={5}
                    >
                        <Text>Next: Gallery</Text>
                        <IoIosArrowForward size={20} />
                    </Link>
                </Flex>
            </Container>
        </Box>
    )
}