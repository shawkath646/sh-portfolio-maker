"use client";
import { motion } from "framer-motion";
import { Box, Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import { ReawardsType } from "@/types/types";
import formatDate from "@/utils/formatDate";
import { FaMedal } from "react-icons/fa";

const Reawards = ({ reawardsData }: { reawardsData: ReawardsType[] }) => (
    <Box as="section" mb={18}>
        <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
            <Box p={2.5} bg="#e0f2fe" borderRadius="full" color="#0ea5e9">
                <FaMedal size={26} />
            </Box>
            <Heading fontSize={["2xl", "3xl"]} textAlign="center">Reawards & Achievements</Heading>
        </Flex>
        <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={5}>
            {reawardsData.sort((a, b) => a.index - b.index).map((item, index) => (
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
                    <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.title}`}</Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Issued by:</Text>
                        &nbsp;{item.issuedBy}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Issued on:</Text>
                        &nbsp;{formatDate(item.issuedOn as Date)}
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

export default Reawards;