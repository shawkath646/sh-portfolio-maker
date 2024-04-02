"use client";
import { motion } from "framer-motion";
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Popover,
    PopoverTrigger,
    PopoverHeader,
    PopoverCloseButton,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import formatDate from "@/utils/formatDate";
import { WorkExperienceItemType } from "@/types/types";
import { MdWork, MdWorkspaces } from "react-icons/md";

const WorkExperience = ({ workExperienceData }: { workExperienceData: WorkExperienceItemType[] }) => (
    <Box as="section" mb={18}>
        <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
            <Box p={2.5} bg="#d1fae5" borderRadius="full" color="#10b981">
                <MdWork size={26} />
            </Box>
            <Heading fontSize={["2xl", "3xl"]} textAlign="center">
                Work Experience
            </Heading>
        </Flex>
        <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} gap={5}>
            {workExperienceData.map((item, index) => (
                <Box
                    key={index}
                    as={motion.div}
                    p={6}
                    bg="#fff"
                    boxShadow="md"
                    borderRadius="lg"
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
                    <Popover>
                        <PopoverTrigger>
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2} isTruncated>{`${index + 1}. ${item.role}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Role</PopoverHeader>
                            <PopoverBody>{item.role}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Company:</Text>
                        &nbsp;{item.companyName}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Industry:</Text>
                        &nbsp;{item.industry}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Work Type:</Text>
                        &nbsp;{item.workType}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Location:</Text>
                        &nbsp;{item.location}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Location Type:</Text>
                        &nbsp;{item.locationType}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Duration:</Text>
                        &nbsp;{formatDate(item.startsFrom as Date)} - {item.endsOn ? formatDate(item.endsOn as Date) : "Present"}
                    </Text>
                    <Box w="full" h="25px" mb={2}>
                        {item.description && (
                            <Popover>
                                <PopoverTrigger>
                                    <Text mb={2} isTruncated>
                                        <Text as="span" fontWeight="semibold">Description:</Text>
                                        &nbsp;{item.description}
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Description</PopoverHeader>
                                    <PopoverBody>{item.description}</PopoverBody>
                                </PopoverContent>
                            </Popover>
                        )}
                    </Box>
                    <Box h="22px" mb={2}>
                        <Popover>
                            <PopoverTrigger>
                                <Text isTruncated>
                                    <Text as="span" fontWeight="semibold">Skills:</Text>
                                    <Text as="span" color="#22c55e" fontWeight={500}>&nbsp;{item.skills.join(", ").toString()}</Text>
                                </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Skills</PopoverHeader>
                                <PopoverBody>
                                    <List>
                                        {item.skills.map((skill, index) => (
                                            <ListItem key={index} color="#10b981">
                                                <ListIcon as={MdWorkspaces} />
                                                {skill}
                                            </ListItem>
                                        ))}
                                    </List>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                </Box>
            ))}
        </SimpleGrid>
    </Box>
);

export default WorkExperience;