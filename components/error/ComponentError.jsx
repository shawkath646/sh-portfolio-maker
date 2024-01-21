import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";




export default function ComponentError({ message }) {

    const router = useRouter();

    return (
        <Box as={Center} h={80}>
            <Stack textAlign="center">
                <Stack direction="row" alignItems="center" mb={20}>
                    <Text fontSize={25}>Something went wrong !</Text>
                    <MdErrorOutline size={30} />
                </Stack>
                <Text fontSize={15} color="red">{message}</Text>
                <Stack direction="row" alignItems="center" spacing={4}>
                    <Button onClick={() => router.refresh()} colorScheme='messenger'>Reload page</Button>
                    <Link href="/supports" className="text-blue-500 hover:text-blue-600 transition-all">Contact to supports</Link>
                </Stack>
            </Stack>
        </Box>
    );
}