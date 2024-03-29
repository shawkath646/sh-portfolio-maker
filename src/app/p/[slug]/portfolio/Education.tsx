"use client";
import { motion } from "framer-motion";
import { Box, Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { EducationType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { IoSchool } from "react-icons/io5";


const Education = ({ educationData }: { educationData: EducationType[] }) => (
    <Box as="section" mb={18}>
        <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
            <Box p={2.5} bg="#c7d2fe" borderRadius="full" color="#6366f1">
                <IoSchool size={26} />
            </Box>
            <Heading fontSize={["2xl", "3xl"]}>Education</Heading>
        </Flex>
        <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={5}>
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
                    <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.degree}`}</Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Institute:</Text>
                        &nbsp;{item.institute}
                    </Text>
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

export default Education;