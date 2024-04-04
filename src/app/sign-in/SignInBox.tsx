"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Container, Box, SimpleGrid, GridItem, Heading, Text, Stack, Button, Checkbox, useBoolean } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import shasIcon from "@/assets/icon_sh_authentication_system.png";


const SignInBox = ({
    brandIconTransparent,
    brandName,
    brandWebsite
}: {
    brandIconTransparent?: string,
    brandName: string,
    brandWebsite?: string,
}) => {

    const [isAccepted, setAccepted] = useBoolean();

    return (
        <Box h="full" w="full" as="main">
            <Container
                as={SimpleGrid}
                maxW={1536}
                mx="auto"
                pt={[20, 20, 40]}
                overflow="hidden"
                px={4}
                mb={[10, 10, 10, 20]}
                minHeight="75vh"
                columns={[1, 1, 1, 2]}
                columnGap={[0, 0, 0, "5rem", "8rem"]}
                rowGap={10}
            >
                <GridItem as="section">
                    <Heading
                        as='h3'
                        size='xl'
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                    >
                        Portfolio Login: Gateway to Your Creativity
                    </Heading>
                    <Text mt={8} className="text-gray-600">Welcome to Your Gateway of Artistry and Professionalism! Login to Unleash Your Creative Journey, Seamlessly Create and Showcase Your Portfolio, Dive into Tailoring Your Vision, Managing Your Artistic Odyssey, and Effortlessly Sharing Your Unique Narrative with the World.</Text>
                    <Text mt={4} className="text-gray-600">This platform is entirely free, non-profit, and operates with transparency — no hidden charges or fees. It's self-funded, dedicated solely to empowering creators like you, offering a seamless experience without any financial obligations.</Text>

                    <Link href={brandWebsite || "#"} _hover={{ textDecoration: "none", color: "#2563eb", transition: "color 0.3s ease" }}>
                        <Stack direction="row" justifyContent="center" my={10} alignItems="center" spacing={5}>
                            {brandIconTransparent && (
                                <Box width={110} height={50}>
                                    <Image src={brandIconTransparent} alt={`${brandName} logo`} width={110} height={50} />
                                </Box>
                            )}
                            <div>
                                <Text fontSize={22}>{brandName}</Text>
                                <Text>Where lines of code paint dreams.</Text>
                            </div>
                        </Stack>
                    </Link>
                    <Text textAlign="center" fontSize={22}>Single account, providing access to all services.</Text>
                </GridItem>
                <GridItem as="section">
                    <Text fontSize="2xl" fontWeight="bold" mb={5}>Login Provider -</Text>
                    <Stack mb={8} direction="row" alignItems="center">
                        <Image src={shasIcon} alt="SH Authentication SYstem Icon" height={40} width={40} />
                        <div>
                            <Text fontSize="xl">SH Authentication System</Text>
                            <Text fontSize="md" color="#2563eb">Simple | Fast | Secured</Text>
                        </div>
                    </Stack>
                    <Button
                        isDisabled={!isAccepted}
                        mx={["auto", "auto", "unset"]}
                        display="block"
                        onClick={() => signIn("cloudburst-lab", { callbackUrl: "/profile" })}
                        leftIcon={brandIconTransparent ? <Image src={brandIconTransparent} alt={`${brandName} logo`} height={20} width={38} /> : undefined}
                    >
                        Sign in with {brandName}
                    </Button>
                    <Checkbox isChecked={isAccepted} onChange={setAccepted.toggle}>
                        <Text className="text-gray-500 text-sm" maxW={500} my={6}>By logging in, I agree to our&nbsp;
                            <Link
                                href="/privacy-policy"
                                color="#3b82f6"
                                _hover={{ color: "#2563eb", transition: "color 0.3s ease" }}
                            >
                                Privacy Policy
                            </Link>
                            &nbsp;and&nbsp;
                            <Link
                                href="/privacy-policy"
                                color="#3b82f6"
                                _hover={{ color: "#2563eb", transition: "color 0.3s ease" }}
                            >
                                Terms & Conditions
                            </Link>
                            , ensuring a secure and respectful environment for all users.</Text>
                    </Checkbox>
                    <Link
                        href="https://sh-authentication-system.vercel.app"
                        color="#3b82f6"
                        isExternal
                        _hover={{ color: "#2563eb", transition: "color 0.3s ease" }}
                        mx="auto"
                        fontWeight="semibold"
                        display="block"
                        width="fit-content"
                    >
                        Use {brandName} ID in your application
                    </Link>
                    <Text fontSize={16} mt={5}>Enjoy seamless access to all SH CloudBurst Labs applications with a single account login, eliminating the need to sign in repeatedly. Streamline your experience and enhance efficiency effortlessly.</Text>
                </GridItem>
            </Container>
        </Box>
    );
};

export default SignInBox;