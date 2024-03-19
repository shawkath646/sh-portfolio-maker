"use client";
import { motion } from "framer-motion";
import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import formatDate from "@/utils/formatDate";
import { WorkExperienceType } from "@/types/types";
import { MdWork } from "react-icons/md";

export default function WorkExperience({ workExperienceData }: { workExperienceData: WorkExperienceType[] }) {
    
    return (
        <Box as="section" mb={18}>
            <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
                <Box p={2.5} bg="#d1fae5" borderRadius="full" color="#10b981">
                    <MdWork size={26} />
                </Box>
                <Heading fontSize={["2xl", "3xl"]} textAlign="center">
                    Work Experience
                </Heading>
            </Flex>
            <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={5}>
                {workExperienceData.sort((a, b) => a.index - b.index).map((item, index) => (
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
                        <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.role}`}</Text>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Company:</Text>
                            <Text>{item.companyName}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Industry:</Text>
                            <Text>{item.industry}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Working type:</Text>
                            <Text>{item.workType}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Location:</Text>
                            <Text>{item.location}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Working type:</Text>
                            <Text>{item.locationType}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Starts from:</Text>
                            <Text>{formatDate(item.startsFrom as Date)}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>{item.endsOn ? "Ends on:" : "Present"}</Text>
                            <Text>{item.endsOn && formatDate(item.endsOn as Date)}</Text>
                        </Flex>
                        <Text fontWeight="semibold">{item.description && "Description:"}</Text>
                        <Text>{item.description}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}