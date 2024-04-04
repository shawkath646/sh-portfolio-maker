"use server";
import type { Metadata } from 'next';
import { Box, Container, Divider, SimpleGrid, Text } from '@chakra-ui/react';
import privacyPolicy from "@/JSONData/privacyPolicy.json";

export async function metadata(): Promise<Metadata> {
    return {
        title: "Privacy Policy - SH Portfolio Maker"
    }
};

const Page = async () => (
    <Box as="main" w="full" h="full">
        <Container as="section" maxW={1536} mx="auto" pt={20} mb={5} px={5} bg="white" minH="75vh">
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

export default Page;