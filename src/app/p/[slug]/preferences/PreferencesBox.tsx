"use client";
import { Box, Container, Heading, Grid, Text, GridItem, Flex, SimpleGrid, Icon, List, ListItem, ListIcon } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { PreferencesType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { IoIosArrowBack } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { FaCog, FaUserCircle, FaStar, FaCalendar } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";

const PreferencesBox = ({ username, preferencesData }: { username: string, preferencesData: PreferencesType }) => (
    <Box
        as="main"
        w="full"
        bgColor="#f1f5f9"
    >
        <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
            <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
                <Box p={2.5} bg="#dbeafe" borderRadius="full" color="#3b82f6">
                    <FaCog size={26} />
                </Box>
                <Heading fontSize={["2xl", "3xl"]}>Preferences</Heading>
            </Flex>
            <SimpleGrid columns={[1, 1, 2]} gap={8}>
                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={FaUserCircle} h={8} w={8} />
                        <Heading as="h2" size="md">Personal Information</Heading>
                    </Flex>
                    {preferencesData.dateOfBirth && (
                        <Text mb={1}>
                            <Text as="span" fontWeight={500}>Date of Birth:</Text>
                            &nbsp;{formatDate(preferencesData.dateOfBirth as Date)}
                        </Text>
                    )}
                    {preferencesData.maritalStatus && (
                        <Text mb={1}>
                            <Text as="span" fontWeight={500}>Marital Status:</Text>
                            &nbsp;{preferencesData.maritalStatus}
                        </Text>
                    )}
                    {preferencesData.languages.length > 0 && (
                        <Text mb={1}>
                            <Text as="span" fontWeight={500}>Languages:</Text>
                            &nbsp;{preferencesData.languages.join(", ")}
                        </Text>
                    )}

                    {(!preferencesData.dateOfBirth && !preferencesData.maritalStatus && !preferencesData.languages.length) && (
                        <Text ml={4}>No personal information provided.</Text>
                    )}
                </GridItem>
                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={IoHomeSharp} h={7} w={7} />
                        <Heading as="h2" size="md">Address</Heading>
                    </Flex>

                    {(preferencesData.presentAddress.line1 || preferencesData.presentAddress.line2) && (
                        <Text mb={2}>
                            <Text as="span" fontWeight={500}>Present Address:</Text>
                            &nbsp;{preferencesData.presentAddress.line1}, {preferencesData.presentAddress.line2}
                        </Text>
                    )}

                    {(preferencesData.permanentAddress.line1 || preferencesData.permanentAddress.line2) && (
                        <Text>
                            <Text as="span" fontWeight={500}>Permanent Address:</Text>
                            &nbsp;{preferencesData.permanentAddress.line1}, {preferencesData.permanentAddress.line2}
                        </Text>
                    )}

                    {(!preferencesData.presentAddress.line1 && !preferencesData.presentAddress.line2 && !preferencesData.permanentAddress.line1 && !preferencesData.permanentAddress.line2) && (
                        <Text ml={4}>No address provided.</Text>
                    )}
                </GridItem>

                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={FaStar} h={7} w={7} />
                        <Heading as="h2" size="md">Interests</Heading>
                    </Flex>
                    {preferencesData.interestedIn.length > 0 ? (
                        <List mb={1}>
                            {preferencesData.interestedIn.map((item, key) => (
                                <ListItem key={key} as={Flex} alignItems="center">
                                    <ListIcon as={FcPlus} />
                                    <Text>{item}</Text>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Text ml={4}>No interested item.</Text>
                    )}
                </GridItem>
                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={FaCalendar} h={6} w={6} />
                        <Heading as="h2" size="md">Events</Heading>
                    </Flex>
                    {preferencesData.events.length ? preferencesData.events.map((event, index) => (
                        <Box key={index}>
                            <Text mt={2} fontWeight={500}>{formatDate(event.timestamp as Date)}</Text>
                            <Text mb={2}>{event.title}</Text>
                            {event.description && (
                                <Text>
                                    <Text as="span" fontWeight={500}>Description:</Text>
                                    &nbsp;{event.description}
                                </Text>
                            )}
                        </Box>
                    )) : (
                        <Text ml={4}>No events item.</Text>
                    )}
                </GridItem>
            </SimpleGrid>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mt={8}
                mb={5}
            >
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
                    <IoIosArrowBack size={20} />
                    <Text>Prev: Gallery</Text>
                </Link>
            </Flex>
        </Container>
    </Box>
);


export default PreferencesBox;