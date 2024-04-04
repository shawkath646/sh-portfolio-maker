"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Container, Flex, Text, Heading, GridItem, Grid, Icon, Center } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import formatDate from "@/utils/formatDate";
import { ProjectItemType } from "@/types/types";
import { FaGithub, FaExternalLinkAlt, FaFile, FaRegImages } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoWarning, IoLogoAppleAr } from "react-icons/io5";

const ProjectBox: React.FC<{ projectsData: ProjectItemType[], username: string }> = ({ projectsData, username }) => (
    <Box
        as="main"
        w="full"
        bgColor="#f1f5f9"
    >
        <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
            {projectsData.length ? (
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
                            <Box p={4} borderWidth="1px" boxShadow="md" bg="#fff" rounded="xl">
                                <Box position="relative" height="120px" mb={38}>
                                    {item.coverImage ? (
                                        <Image src={item.coverImage} alt={`${item.name} cover`} fill style={{ borderRadius: "0.7rem" }} />
                                    ) : (
                                        <Center position="absolute" w="full" h="full" bgColor="#e2e8f0">
                                            <FaRegImages size={50} />
                                        </Center>
                                    )}
                                    <Box
                                        position="absolute"
                                        bottom={0}
                                        left="50%"
                                        transform="translateX(-50%)"
                                        mb={-27}
                                        borderRadius="full"
                                        overflow="hidden"
                                        border="4px solid white"
                                    >
                                        {item.icon ? (
                                            <Image
                                                src={item.icon}
                                                alt={`${item.name} icon`}
                                                height={70}
                                                width={70}
                                                style={{
                                                    height: "67px", width: "70px"
                                                }}
                                            />
                                        ) : (
                                            <IoLogoAppleAr size={50} color="#8b5cf6" />
                                        )}
                                    </Box>
                                </Box>
                                <Heading as="h3" fontWeight={500} fontSize="xl" mb={2}>{item.name}</Heading>
                                <Text fontSize="sm" mb={1}>
                                    <Text as="span" fontWeight={500}>Type:</Text>
                                    &nbsp;{item.type}
                                </Text>
                                <Text fontSize="sm" mb={1}>
                                    <Text as="span" fontWeight={500}>Duration:</Text>
                                    &nbsp;{formatDate(item.startsFrom as Date)} - {item.endsOn ? formatDate(item.endsOn as Date) : "Present"}
                                </Text>
                                <Box mt={4}>
                                    {item.description && (
                                        <Link href={`/p/${username}/projects/${item.id}`} fontSize="sm" mr={2}><Icon as={FaFile} mr={1} />Project</Link>
                                    )}
                                    {item.sourceLink && (
                                        <Link href={item.sourceLink} isExternal fontSize="sm" mr={2}><Icon as={FaGithub} mr={1} />Source</Link>
                                    )}
                                    {item.liveLink && (
                                        <Link href={item.liveLink} isExternal fontSize="sm" mr={2}><Icon as={FaExternalLinkAlt} mr={1} />Live</Link>
                                    )}
                                </Box>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            ) : (
                <Box as={Center} minH="60vh" gap={3}>
                    <IoWarning size={26} />
                    <Text fontSize="24px">No project item found.</Text>
                </Box>
            )}
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mt={8}
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
                >
                    <Text>Next: Gallery</Text>
                    <IoIosArrowForward size={20} />
                </Link>
            </Flex>
        </Container>
    </Box>
);

export default ProjectBox;
