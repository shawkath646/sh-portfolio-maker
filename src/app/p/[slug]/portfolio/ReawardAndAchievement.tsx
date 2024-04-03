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
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from "@chakra-ui/react";
import { ReawardAndAchievementItemType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { FaMedal } from "react-icons/fa";

const ReawardAndAchievement = ({ reawardAndAchievementItems }: { reawardAndAchievementItems: ReawardAndAchievementItemType[] }) => (
    <Box as="section" mb={18}>
        <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
            <Box p={2.5} bg="#e0f2fe" borderRadius="full" color="#0ea5e9">
                <FaMedal size={26} />
            </Box>
            <Heading fontSize={["2xl", "3xl"]} textAlign="center">Reawards & Achievements</Heading>
        </Flex>
        <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} gap={5}>
            {reawardAndAchievementItems.map((item, index) => (
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
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.title}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Title</PopoverHeader>
                            <PopoverBody>{item.title}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Issued By:</Text>
                                &nbsp;{item.issuedBy}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Issued By:</PopoverHeader>
                            <PopoverBody>{item.issuedBy}</PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Issued On:</Text>
                        &nbsp;{formatDate(item.issuedOn as Date)}
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

export default ReawardAndAchievement;