"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { Avatar, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import mainLogo from "@/assets/logo_sh_portfolio_maker_1080x1080.png";



export default function Navbar() {

    const { data: session } = useSession();

    const navItem = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Education",
            href: "/education"
        },
        {
            name: "Gallery",
            href: "/gallery"
        },
        {
            name: "Projects",
            href: "/projects"
        },
        {
            name: "Preferences",
            href: "/preferences"
        },
        
    ];

    return (
        <>
            <nav className="fixed inset-0 z-[99] min-h-fit print:hidden">
                <Flex justifyContent="space-between" alignItems="center" mx="auto" bg="white" pt={1} px={[3, 3, 0]} className="container">
                    <Stack as={Link} href='/' direction="row" alignItems="center" spacing={4}>
                        <Image src={mainLogo.src} height={50} width={50} alt="Header Logo" />
                        <Text fontSize="xl">SH PORTFOLIO MAKER</Text>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={5}>
                        <Stack direction="row" alignItems="center" spacing={8} display={["none", "none", "none", "flex"]}>
                            {navItem.map((data, index) => (
                                <Link key={index} href={data.href}>
                                    <Text casing="uppercase" fontWeight={400} fontSize="lg" className="text-blue-500 hover:text-blue-700 transition-all">{data.name}</Text>
                                </Link>
                            ))}
                        </Stack>
                        {true ? (
                            <FaMoon size={25} />
                        ) : (
                            <FaRegSun size={25} />
                        )}
                        {session && (
                            <Menu>
                                <MenuButton
                                    as={Avatar}
                                    aria-label='User'
                                    name={session?.user?.name}
                                    src={session?.user?.image}
                                    cursor="pointer"
                                />
                                <MenuList>
                                    <MenuItem as={Link} href='/profile'>Profile</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        )}
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<GiHamburgerMenu size={25} className="mx-auto" />}
                                variant='outline'
                                display={["block", "block", "block", "none"]}
                            />
                            <MenuList>
                                {navItem.map((data, index) => (
                                    <Fragment key={index}>
                                        <MenuItem as={Link} href={data.href}>
                                            <Text casing="uppercase" fontWeight={400} className="text-blue-500 hover:text-blue-600 transition-all">{data.name}</Text>
                                        </MenuItem>
                                        <MenuDivider />
                                    </Fragment>
                                ))}
                            </MenuList>
                        </Menu>
                    </Stack>
                </Flex>
            </nav>
            <div className="pb-20"></div>
        </>
    );
}