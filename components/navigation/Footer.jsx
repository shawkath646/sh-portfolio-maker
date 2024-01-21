import 'server-only';
import Link from "next/link";
import Image from "next/image";
import { Button, Divider, Flex, GridItem, Input, List, ListItem, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import getDeveloperData from '@/lib/getDeveloperData';
import logoMain from "@/assets/logo_sh_portfolio_maker_1080x1080.png"


export default async function Footer() {

    const developerData = await getDeveloperData();

    return (
        <footer className="container mx-auto bg-gray-900 text-white p-3 lg:p-7">
            <SimpleGrid columns={[1, 1, 1, 2]} gap={5} pt={8}>
                <GridItem as={Stack} direction="row" justifyContent="space-between" fontSize={14} className="uppercase text-[#798fb0]">
                    <List spacing={2}>
                        <ListItem>
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${developerData.username}`} className="hover:text-[#9ab2d6] transition-all">Developer portfolio</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${developerData.username}/projects`} className="hover:text-[#9ab2d6] transition-all">View all projects</Link>
                        </ListItem>
                        <ListItem>
                            <Link href={`mailto:${developerData.email}`} className="hover:text-[#9ab2d6] transition-all">Report's problem</Link>
                        </ListItem>
                    </List>
                    <List spacing={2}>
                        <ListItem>
                            <Link href="/privacy-policy" className="hover:text-[#9ab2d6] transition-all">Privacy Policy</Link>
                        </ListItem>
                        <ListItem>
                            <Link href="/terms-and-condition" className="hover:text-[#9ab2d6] transition-all">Terms & Conditions</Link>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem mx="auto">
                    <Text mb={2} fontWeight="semibold" color="#c2c6cc">Subscribe to our newsletter</Text>
                    <Flex w={[400, 400, 450]}>
                        <Input bg="#272a2e" outline="none" border="none" />
                        <Button colorScheme="pink">SUBSCRIBE</Button>
                    </Flex>
                </GridItem>
            </SimpleGrid>
            <Divider my={10} />
            <SimpleGrid columns={[1, 1, 1, 2]} gap={5}>
                <GridItem as={Stack} direction="row" alignItems="center" justifyContent="space-between">
                    <Stack direction="row" alignItems="center">
                        <Image src={logoMain.src} alt="Main logo" height={40} width={40} />
                        <Text>SH PORTFOLIO MAKER</Text>
                    </Stack>
                    <Stack direction="row" spacing={4} className="text-[#798fb0]">
                        <Link href={developerData.contactFB}>
                            <SiFacebook size={20} className="hover:text-[#9ab2d6] transition-all" />
                        </Link>
                        <Link href={developerData.contactGithub}>
                            <FaGithub size={20} className="hover:text-[#9ab2d6] transition-all" />
                        </Link>
                        <Link href={developerData.contactLinkedIn}>
                            <FaLinkedin size={20} className="hover:text-[#9ab2d6] transition-all" />
                        </Link>
                        <Link href={developerData.contactWP}>
                            <FaWhatsapp size={20} className="hover:text-[#9ab2d6] transition-all" />
                        </Link>
                    </Stack>
                </GridItem>
                <GridItem>
                    <Text color="gray" textAlign={["center", "center", "right"]}>© 2024 SH WEB PRODUCTS, Inc. All rights reserved.</Text>
                </GridItem>
            </SimpleGrid>
        </footer>
    );
}