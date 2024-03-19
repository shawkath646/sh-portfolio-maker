"use client";
import { motion } from "framer-motion";
import { Box, Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { EducationType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { IoSchool } from "react-icons/io5";


const Education = ({ educationData }: { educationData: EducationType[] }) => {

    return (
        <Box as="section" mb={18}>
            <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
                <Box p={2.5} bg="#c7d2fe" borderRadius="full" color="#6366f1">
                    <IoSchool size={26} />
                </Box>
                <Heading fontSize={["2xl", "3xl"]} textAlign="center">
                    Education
                </Heading>
            </Flex>
            <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={5}>
                {educationData.sort((a, b) => a.index - b.index).map((item, index) => (
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
                        <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.degree}`}</Text>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Institute:</Text>
                            <Text>{item.institute}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Type:</Text>
                            <Text>{item.type}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Field of study:</Text>
                            <Text>{item.field}</Text>
                        </Flex>
                        <Flex flexWrap="wrap" alignItems="center" mb={2}>
                            <Text fontWeight="semibold" mr={2}>Grade:</Text>
                            <Text>{item.grade}</Text>
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
};

export default Education;