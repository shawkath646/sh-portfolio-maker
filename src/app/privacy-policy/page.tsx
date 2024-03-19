"use server";
//Ready and optimized
import { Box, Container, Divider, SimpleGrid, Text } from '@chakra-ui/react';
import privacyPolicy from "@/JSONData/privacyPolicy.json";

export default async function Page() {

    return (
        <Box as="main">
            <Container as="section" maxW={1536} mx="auto" mt={12} mb={5} p={5} bg="white" height={["unset", "unset", "700px"]}>
                <Text fontSize='3xl' fontWeight="bold" textAlign="center" mb={5}>Privacy Policy</Text>
                <Divider />
                <SimpleGrid columns={[1, 1, 2, 3]} gap={5} mt={5}>
                    {privacyPolicy.map((data, index) => (
                        <Box key={index}>
                            <Text fontSize='xl' fontWeight='semibold' mb={3}>{index + 1}. {data.title}</Text>
                            <Text>{data.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}