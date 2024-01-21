//Ready and optimized
'use client';
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Box, Button, Checkbox, GridItem, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import googleIcon from "@/assets/icons/google.png"
import facebookIcon from "@/assets/icons/facebook.png"
import githubIcon from "@/assets/icons/github.png"


export default function Page() {

    const [isAccepted, setAccepted] = useState(false);

    return (
        <main className="lg:pt-20 w-full">
            <div className="container mx-auto p-3 lg:p-0">
                <SimpleGrid columns={[1, 1, 2]} mt={[0, 0, 20]} spacing={20} mb={40}>
                    <GridItem as="section">
                        <Heading as='h3' size='xl'>Portfolio Login: Gateway to Your Creativity</Heading>
                        <Text mt={8} className="text-gray-600">Welcome to Your Gateway of Artistry and Professionalism! Login to Unleash Your Creative Journey, Seamlessly Create and Showcase Your Portfolio, Dive into Tailoring Your Vision, Managing Your Artistic Odyssey, and Effortlessly Sharing Your Unique Narrative with the World.</Text>
                        <Text mt={4} className="text-gray-600">This platform is entirely free, non-profit, and operates with transparency — no hidden charges or fees. It's self-funded, dedicated solely to empowering creators like you, offering a seamless experience without any financial obligations.</Text>
                    </GridItem>
                    <GridItem as="section">
                        <Text textAlign="center" fontSize={22}>To use our services you must need to signin!</Text>
                        <Box as={Stack} mt={8} alignItems="center">
                            <Checkbox isChecked={isAccepted} onChange={event => setAccepted(event.target.checked)}>
                                <Text className="text-gray-500 text-sm" maxW={400} mb={6}>By logging in, I agree to our&nbsp;
                                    <Link href="/privacy-policy" className="text-blue-500 hover:text-blue-600 transition-all">Privacy Policy</Link>
                                    &nbsp;and&nbsp;
                                    <Link href="/terms-and-conditions" className="text-blue-500 hover:text-blue-600 transition-all">Terms & Conditions</Link>
                                    , ensuring a secure and respectful environment for all users.</Text>
                            </Checkbox>
                            <Button
                                bg="transparent"
                                rounded={7}
                                w={380}
                                className="border border-gray-400 cursor-pointer"
                                leftIcon={
                                    <Image src={googleIcon.src} alt="Google icon" width={22} height={22} className="rounded-full" />
                                }
                                isDisabled={!isAccepted}
                                onClick={() => signIn('google')}
                            >
                                <Text>Continue with Google</Text>
                            </Button>
                            <Button
                                bg="transparent"
                                rounded={7}
                                w={380}
                                className="border border-gray-400 cursor-pointer"
                                leftIcon={
                                    <Image src={facebookIcon.src} alt="Facebook icon" width={22} height={22} className="rounded-full" />
                                }
                                isDisabled={!isAccepted || true}
                                onClick={() => signIn('facebook')}
                            >
                                <Text>Continue with Facebook</Text>
                            </Button>
                            <Button
                                bg="transparent"
                                rounded={7}
                                w={380}
                                className="border border-gray-400 cursor-pointer"
                                leftIcon={
                                    <Image src={githubIcon.src} alt="Github icon" width={22} height={22} className="rounded-full" />
                                }
                                isDisabled={!isAccepted}
                                onClick={() => signIn('github', { callbackUrl: '/profile' })}
                            >
                                <Text>Continue with Github</Text>
                            </Button>
                        </Box>
                    </GridItem>
                </SimpleGrid>
            </div>
        </main>
    );
}