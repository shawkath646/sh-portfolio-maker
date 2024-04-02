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
import { FaRegLightbulb } from "react-icons/fa";
import formatDate from "@/utils/formatDate";
import { VolunteeringItemType } from "@/types/types";


const Volunteering = ({ volunteeringData }: { volunteeringData: VolunteeringItemType[] }) => (
    <Box as="section" mb={18}>
        <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
            <Box p={2.5} bg="#ffedd5" borderRadius="full" color="#f59e0b">
                <FaRegLightbulb size={26} />
            </Box>
            <Heading fontSize={["2xl", "3xl"]} textAlign="center">
                Volunteering
            </Heading>
        </Flex>
        <SimpleGrid columns={[1, 1, 1, 2, 2, 3]} gap={5}>
            {volunteeringData.map((item, index) => (
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
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.role}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Role</PopoverHeader>
                            <PopoverBody>{item.role}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Organization:</Text>
                                &nbsp;{item.organization}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Organization:</PopoverHeader>
                            <PopoverBody>{item.organization}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Purpose:</Text>
                        &nbsp;{item.purpose}
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

export default Volunteering;