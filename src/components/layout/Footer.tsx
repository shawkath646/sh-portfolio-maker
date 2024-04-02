"use client";
import Image from "next/image";
import { Button, Box, Divider, Flex, GridItem, Input, List, ListItem, SimpleGrid, Stack, Text, Container } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { AppDataType, BrandDataType } from "shas-app-controller/types";
import { MetaDataType } from "@/types/types";



export default function Footer({ appData, brandData, authorData }: { appData?: AppDataType, brandData?: BrandDataType, authorData: MetaDataType | null }) {

    const brandFacebook = brandData?.socialPlatform.find(item => item.name.toLowerCase() === "facebook");
    const brandLinkedIn = brandData?.socialPlatform.find(item => item.name.toLowerCase() === "linkedin");
    const brandGitHub = brandData?.socialPlatform.find(item => item.name.toLowerCase() === "github");

    return (
        <Box as="footer" bgColor="#111827" color="#fff">
            <Container maxW={1536} mx="auto" p={2}>
                <SimpleGrid columns={[1, 1, 1, 2]} gap={5} pt={8}>
                    <GridItem as={Stack} direction="row" justifyContent="space-between" textTransform="uppercase" fontSize={14} color="#798fb0">
                        <List spacing={2}>
                            <ListItem>
                                <Link href={`/p/${authorData?.username}`} _hover={{ textDecoration: "none", color: "#9ab2d6", transition: "color 0.3s ease" }}>Developer portfolio</Link>
                            </ListItem>
                            <ListItem>
                                <Link href={`/p/${authorData?.username}/projects`} _hover={{ textDecoration: "none", color: "#9ab2d6", transition: "color 0.3s ease" }}>View all projects</Link>
                            </ListItem>
                            <ListItem>
                                <Link href={`mailto:${appData?.contact}`} _hover={{ textDecoration: "none", color: "#9ab2d6", transition: "color 0.3s ease" }}>Report's problem</Link>
                            </ListItem>
                        </List>
                        <List spacing={2}>
                            <ListItem>
                                <Link href="/privacy-policy" _hover={{ textDecoration: "none", color: "#9ab2d6", transition: "color 0.3s ease" }}>Privacy Policy</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" _hover={{ textDecoration: "none", color: "#9ab2d6", transition: "color 0.3s ease" }}>Terms & Conditions</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#" _hover={{ textDecoration: "none", color: "#9ab2d6", transition: "color 0.3s ease" }}>Find Help</Link>
                            </ListItem>
                        </List>
                    </GridItem>
                    <GridItem mx="auto">
                        <Text mb={2} fontWeight="semibold" color="#c2c6cc">Subscribe to our newsletter</Text>
                        <Flex w={["full", "full", 450]}>
                            <Input bg="#272a2e" outline="none" border="none" />
                            <Button isDisabled colorScheme="pink">SUBSCRIBE</Button>
                        </Flex>
                    </GridItem>
                </SimpleGrid>
                <Divider my={10} />
                <SimpleGrid columns={[1, 1, 1, 2]} gap={5}>
                    <GridItem as={Stack} direction="row" alignItems="center" justifyContent="space-between">
                        <Stack as={Link} href={brandData?.website || "#"} direction="row" alignItems="center" _hover={{ textDecoration: "none", color: "#2563eb", transition: "color 0.3s ease" }}>
                            {brandData?.iconTransparent && (
                                <Image src={brandData?.iconTransparent} alt={`${brandData?.name} icon`} height={45} width={80} style={{ height: "45px", width: "80px" }} />
                            )}
                            <Text>{brandData?.name}</Text>
                        </Stack>
                        <Stack direction="row" spacing={4} className="text-[#798fb0]">
                            {brandFacebook && (
                                <Link href={brandFacebook.url}>
                                    <SiFacebook size={20} className="hover:text-[#9ab2d6] transition-all" />
                                </Link>
                            )}
                            {brandLinkedIn && (
                                <Link href={brandLinkedIn.url}>
                                    <FaLinkedin size={20} className="hover:text-[#9ab2d6] transition-all" />
                                </Link>
                            )}
                            {brandGitHub && (
                                <Link href={brandGitHub.url}>
                                    <FaGithub size={20} className="hover:text-[#9ab2d6] transition-all" />
                                </Link>
                            )}
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Text color="gray" fontSize="14px" textAlign={["center", "center", "right"]}>{brandData?.copyrightText}</Text>
                    </GridItem>
                </SimpleGrid>
            </Container>
        </Box>
    );
}