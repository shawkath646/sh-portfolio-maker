"use server";
import { ChakraProvider } from '@chakra-ui/react'


export default async function ClientWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <ChakraProvider>{children}</ChakraProvider>
    );
}