"use client";
import { Text, Box, Flex, Heading, Divider } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import formatDate from "@/utils/formatDate";
import { MetaDataType, ViewerItemType } from "@/types/types";

const ProfileExtra: React.FC<{
    metaData: MetaDataType;
    viewerItems: ViewerItemType[]
}> = ({
    metaData,
    viewerItems
}) => (
        <>
            <Heading mt={25} as="h5" size="lg" mb={1}>Viewers</Heading>
            <Divider />
            <Text my={5}>
                <Text as="span" fontWeight="semibold">Total views:</Text>
                &nbsp;{metaData.viewers}
            </Text>
            <Flex direction="column" mt={5}>
                <Flex bg="gray.200" p={4} borderRadius="md" mb={2} textAlign="center">
                    <Box flex="1">
                        <Text fontWeight="bold">Full name</Text>
                    </Box>
                    <Box flex="1">
                        <Text fontWeight="bold">First View</Text>
                    </Box>
                    <Box flex="1">
                        <Text fontWeight="bold">Last View</Text>
                    </Box>
                </Flex>
                {viewerItems.map((data, index) => (
                    <Flex
                        key={index}
                        bg="gray.100"
                        p={4}
                        borderRadius="md"
                        mb={2}
                        alignItems="center"
                    >
                        <Box flex="1" pr={2} isTruncated>
                            <Link
                                href={data.username === "deleted-user" ? "#" : `/p/${data.username}`}
                                color="#3b82f6"
                                _hover={{
                                    textDecoration: "none",
                                    color: "#2563eb",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                {data.name}
                            </Link>
                        </Box>
                        <Box flex="1" textAlign="center">{formatDate(data.firstViewedOn as Date)}</Box>
                        <Box flex="1" textAlign="center">{formatDate(data.lastViewedOn as Date)}</Box>
                    </Flex>
                ))}
            </Flex>
        </>
    );

export default ProfileExtra;