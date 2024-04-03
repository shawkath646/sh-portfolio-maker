"use client";
import { Box, Container, Heading, Text, GridItem, Flex, SimpleGrid, Icon, List, ListItem, ListIcon, IconButton } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { PreferencesDataType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoHomeSharp, IoClipboardOutline } from "react-icons/io5";
import { FaCog, FaUserCircle, FaStar, FaCalendar } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";

const PreferencesBox = ({ username, preferencesData, joinedOn, profileViews }: { username: string, preferencesData: PreferencesDataType, joinedOn: Date, profileViews: number }) => (
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
                    {preferencesData.personalData.dateOfBirth && (
                        <Text mb={1}>
                            <Text as="span" fontWeight={500}>Date of Birth:</Text>
                            &nbsp;{formatDate(preferencesData.personalData.dateOfBirth as Date)}
                        </Text>
                    )}
                    {preferencesData.personalData.maritalStatus && (
                        <Text mb={1}>
                            <Text as="span" fontWeight={500}>Marital Status:</Text>
                            &nbsp;{preferencesData.personalData.maritalStatus}
                        </Text>
                    )}
                    {preferencesData.personalData.languages.length > 0 && (
                        <Text mb={1}>
                            <Text as="span" fontWeight={500}>Languages:</Text>
                            &nbsp;{preferencesData.personalData.languages.join(", ")}
                        </Text>
                    )}

                    {(
                        !preferencesData.personalData.dateOfBirth
                        && preferencesData.personalData.maritalStatus === "Hidden"
                        && !preferencesData.personalData.languages.length)
                        && (
                            <Text ml={4}>No personal information provided.</Text>
                        )}
                </GridItem>
                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={IoHomeSharp} h={7} w={7} />
                        <Heading as="h2" size="md">Address</Heading>
                    </Flex>

                    {(preferencesData.personalData.presentAddress.line1 || preferencesData.personalData.presentAddress.line2) && (
                        <Text mb={2}>
                            <Text as="span" fontWeight={500}>Present Address:</Text>
                            &nbsp;{preferencesData.personalData.presentAddress.line1}, {preferencesData.personalData.presentAddress.line2}
                        </Text>
                    )}

                    {(preferencesData.personalData.permanentAddress.line1 || preferencesData.personalData.permanentAddress.line2) && (
                        <Text>
                            <Text as="span" fontWeight={500}>Permanent Address:</Text>
                            &nbsp;{preferencesData.personalData.permanentAddress.line1}, {preferencesData.personalData.permanentAddress.line2}
                        </Text>
                    )}

                    {(
                        !preferencesData.personalData.presentAddress.line1
                        && !preferencesData.personalData.presentAddress.line2
                        && !preferencesData.personalData.permanentAddress.line1
                        && !preferencesData.personalData.permanentAddress.line2)
                        && (
                            <Text ml={4}>No address provided.</Text>
                        )}
                </GridItem>

                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={FaStar} h={7} w={7} />
                        <Heading as="h2" size="md">Interests</Heading>
                    </Flex>
                    {preferencesData.personalData.interestedIn.length > 0 ? (
                        <List mb={1}>
                            {preferencesData.personalData.interestedIn.map((item, key) => (
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
                    {preferencesData.eventItems.length ? preferencesData.eventItems.map((event, index) => (
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
                <GridItem>
                    <Flex mb={4} alignItems="center" gap={2}>
                        <Icon as={AiOutlineUnorderedList} h={6} w={6} />
                        <Heading as="h2" size="md">Others</Heading>
                    </Flex>
                    <Text mb={1}>
                        <Text as="span" fontWeight={500}>Joined On:</Text>
                        &nbsp;{formatDate(joinedOn as Date)}
                    </Text>
                    <Text mb={1}>
                        <Text as="span" fontWeight={500}>Profile views:</Text>
                        &nbsp;{profileViews}
                    </Text>
                </GridItem>
            </SimpleGrid>
            <Flex my="50px" alignItems="center" gap={2} justifyContent="center">
                <Text>
                    <Text as="span" fontWeight={500} color="#3b82f6">Profile URL:</Text>
                    &nbsp;{process.env.NEXT_PUBLIC_BASE_URL}/p/{username}
                </Text>
                <IconButton
                    icon={<IoClipboardOutline />}
                    aria-label="copy button"
                    onClick={() => {
                        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL + "/p/" + username);
                        alert("Profile link copied to clipboard.")
                    }}
                />
            </Flex>
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