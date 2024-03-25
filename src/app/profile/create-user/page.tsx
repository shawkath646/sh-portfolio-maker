"use client";
import { Container, Center, Box, Text, useBoolean, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ResponseType } from '@/types/types';
import { useState } from 'react';
import createProfile from '@/actions/database/createProfile';

export default function Page() {

    const [isLoading, setLoading] = useBoolean(false);
    const [pageStatus, setPageStatus] = useState<ResponseType | null>(null);


    const createUser = async() => {
        setLoading.on();
        const response = await createProfile();
        setPageStatus(response);
        setLoading.off();
    }

    return (
        <Box h="full" w="full" bgGradient="linear(to-tr, #2196F3, #87CEEB)">
            <Container as={Center} maxW={1536} mx="auto" pt={20} overflow="hidden" minH="75vh">
                <Box
                    as={motion.div}
                    textAlign="center"
                    py={10}
                    px={8}
                    bgColor="rgba(255, 255, 255, 0.8)"
                    rounded="md"
                    boxShadow="lg"
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <Text
                        fontSize="24px"
                        fontWeight={600}
                        mb={8}

                    >
                        Discover Your Potential with SH Portfolio Maker - Welcome!
                    </Text>
                    <Text
                        fontSize="16px"
                        mb={5}
                    >
                        Ensure your profile is complete with mandatory information before publishing it to the public.
                    </Text>
                    <Text
                        fontSize="14px"
                        fontStyle="italic"
                        mb={8}
                    >
                        ** Note: If you already have an account, this action will reset your database. **
                    </Text>
                    {pageStatus && (
                        <Text
                            fontSize="16px"
                            fontWeight={500}
                            mb={3}
                            color={pageStatus.status === "registred" ? "#14b8a6" : "#f43f5e"}
                        >
                            {pageStatus.message}
                        </Text>
                    )}
                    <Button isLoading={isLoading} onClick={createUser} colorScheme='messenger' ml="auto" loadingText="Creating your profile...">Create your profile</Button>
                </Box>
            </Container>
        </Box>
    );
}