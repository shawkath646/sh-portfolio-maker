"use client";
import { motion } from "framer-motion";
import {
    Box,
    Heading,
    Text,
    Flex,
    SimpleGrid,
    Popover,
    PopoverTrigger,
    PopoverHeader,
    PopoverCloseButton,
    PopoverContent,
    PopoverBody,
    PopoverArrow
} from "@chakra-ui/react";
import { EducationItemType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { IoSchool } from "react-icons/io5";


const Education = ({ educationData }: { educationData: EducationItemType[] }) => (
    <Box as="section" mb={18}>
        <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
            <Box p={2.5} bg="#c7d2fe" borderRadius="full" color="#6366f1">
                <IoSchool size={26} />
            </Box>
            <Heading fontSize={["2xl", "3xl"]}>Education</Heading>
        </Flex>
        <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} gap={5}>
            {educationData.map((item, index) => (
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
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.degree}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Degree</PopoverHeader>
                            <PopoverBody>{item.degree}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Institute:</Text>
                                &nbsp;{item.institute}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Institute</PopoverHeader>
                            <PopoverBody>{item.institute}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Type:</Text>
                        &nbsp;{item.type}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Field of study:</Text>
                        &nbsp;{item.field}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Grade:</Text>
                        &nbsp;{item.grade}
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
                </Box>
            ))}
        </SimpleGrid>
    </Box>
);

export default Education;