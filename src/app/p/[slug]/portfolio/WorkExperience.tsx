"use client";
import { motion } from "framer-motion";
import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import formatDate from "@/utils/formatDate";
import { WorkExperienceType } from "@/types/types";
import { MdWork } from "react-icons/md";

const WorkExperience = ({ workExperienceData }: { workExperienceData: WorkExperienceType[] }) => (
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
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Company:</Text>
                        &nbsp;{item.companyName}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Industry:</Text>
                        &nbsp;{item.industry}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Working type:</Text>
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
                    {item.description && (
                        <Text mb={2}>
                            <Text as="span" fontWeight="semibold">Description:</Text>
                            &nbsp;{item.description}
                        </Text>
                    )}
                </Box>
            ))}
        </SimpleGrid>
    </Box>
);

export default WorkExperience;