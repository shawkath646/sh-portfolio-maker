"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Button, Center, Container, Heading, Text } from "@chakra-ui/react";

export default function Page() {
    return (
        <Container maxW={1536} mx="auto" pt="80px">
            <Center h="75vh">
                <Box textAlign="center" maxW="450px">
                    <Heading as="h1" size="xl">Page not found</Heading>
                    <Text my={5}>This page either does not exist or is currently under development. Please return to the homepage.</Text>
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Button w="100px" colorScheme="blue">Home</Button>
                    </Link>
                </Box>
            </Center>
        </Container>
    );
}