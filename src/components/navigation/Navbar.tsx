"use client";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Fragment } from 'react';
import { Session } from 'next-auth';
import { AppDataType } from 'shas-app-controller/types';
import { Box, Container, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from '@chakra-ui/next-js';
import userSignOut from '@/actions/auth/userSignOut';
import navItem from "@/JSONData/navItem.json";
import { GiHamburgerMenu } from 'react-icons/gi';
import blankUserProfile from "@/assets/blank_user_profile.png";


export default function Navbar({ session, appData }: { session: Session | null; appData?: AppDataType }) {

  const currentUrl = usePathname();
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

  const showTabs = (session?.user && currentUrl?.startsWith("/profile/")) || currentUrl?.startsWith("/p/");

  return (
    <Box as="nav" position="fixed" inset={0} zIndex={99} minH="fit-content" w="full" bg="white">
      <Container as={Flex} maxW={1536} justifyContent="space-between" alignItems="center" mx="auto" py={2} px={3} color="black">
        <Stack as={Link} href="/" _hover={{ textDecoration: "none" }} direction="row" alignItems="center" spacing={4}>
          {appData?.appIcon && (
            <Image src={appData.appIcon} height={40} width={40} style={{ height: "40px", width: "40px" }} alt="Header Logo" />
          )}
          <Text fontSize={["lg", "lg", "xl"]}>{appData?.appName}</Text>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={5}>
          {(showTabs && isLargerThan992) && (
            <Stack direction="row" alignItems="center" spacing={8}>
              {navItem.map((item, index) => {
                const profileUrl = `/profile${item.href}`;
                const baseUrl = `/p/${session?.user.name}${item.href}`;

                const href = currentUrl?.startsWith("/p/") ? baseUrl : profileUrl;
                return (
                  <Link
                    key={index}
                    href={href}
                    textTransform="uppercase"
                    fontWeight={400} color="#3b82f6"
                    fontSize="lg"
                    _hover={{
                      textDecoration: "none",
                      color: "#2563eb",
                      transition: "color 0.3s ease"
                    }}
                  >{item.name}</Link>
                );
              })}
            </Stack>
          )}

          {session?.user && (
            <Menu>
              <MenuButton
                w="38px"
                h="38px"
                aria-label='user profile'
                cursor="pointer"
                rounded="full"
                overflow="hidden"
                border={session.user.isEnterpriseUser ? "2px solid #f59e0b" : "none"}
                style={{ borderSpacing: "20px" }}
                p={0.5}
              >
                <Image
                  src={session.user.image || blankUserProfile.src}
                  alt="user profile"
                  height={38}
                  width={38}
                  style={{
                    borderRadius: "100%"
                  }}
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  color={session.user.isEnterpriseUser ? "#f59e0b" : "#3b82f6"}
                  bgColor={session.user.isEnterpriseUser ? "#fef3c7" : "#bae6fd"}
                >
                  <Link
                    href="https://sh-authentication-system.vercel.app/auth/profile/enterprise"
                    display="block"
                    w="full"
                    _hover={{
                      textDecoration: "none"
                    }}
                  >
                    {session.user.isEnterpriseUser ? "Enterprise user" : "Standard user"}
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem as={Link} href='/profile' _hover={{ textDecoration: "none", ring: 0 }}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => userSignOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
          {(showTabs && !isLargerThan992) && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<GiHamburgerMenu size={25} className="mx-auto" />}
                variant='outline'
              />
              <MenuList>
                {navItem.map((item, index) => {
                  const profileUrl = `/profile${item.href}`;
                  const baseUrl = `/p/${session?.user.name}${item.href}`;

                  const href = currentUrl?.startsWith("/p/") ? baseUrl : profileUrl;

                  return (
                    <Fragment key={index}>
                      <Link
                        as={MenuItem}
                        key={index}
                        href={href}
                        _hover={{
                          textDecoration: "none",
                        }}
                      >
                        <MenuItem
                          textTransform="uppercase"
                          fontWeight={400} color="#3b82f6"
                          fontSize="lg"
                          _hover={{
                            color: "#2563eb",
                            transition: "color 0.3s ease"
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      </Link>
                      <MenuDivider />
                    </Fragment>
                  );
                })}
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
