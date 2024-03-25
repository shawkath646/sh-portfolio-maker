"use client";
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import Intro from './Intro';
import Featured from './Featured'
import Skills from './Skills'
import MiniGallery from './MiniGallery';
import { HomeDataType } from "@/types/types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HomeBox = ({ homeData, username }: { homeData: HomeDataType, username: string; }) => (
    <Box
        as="main"
        w="full"
        bgColor="#f1f5f9"
    >
        <Container maxW={1536} mx="auto" pt={20} overflow="hidden">
            <Intro introData={homeData.intro} />
            {homeData.skillItems.length > 0 && (
                <Skills categories={homeData.intro.skillsCategories} skillsItem={homeData.skillItems} />
            )}
            {homeData.featuredItems.length > 0 && (
                <Featured featuredItems={homeData.featuredItems} />
            )}
            {homeData.miniGalleryItems.length > 0 && (
                <MiniGallery miniGalleryItems={homeData.miniGalleryItems} />
            )}
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mt={8}
                mb={5}
            >
                <Link
                    href="/"
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    color="#0891b2"
                    _hover={{
                        textDecoration: "none",
                        color: "#0e7490",
                        transition: "color 0.3s ease"
                    }}
                    fontWeight={500}
                >
                    <IoIosArrowBack size={20} />
                    <Text>Prev: Landing Page</Text>
                </Link>
                <Link
                    href={`/p/${username}/portfolio`}
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    color="#0891b2"
                    _hover={{
                        textDecoration: "none",
                        color: "#0e7490",
                        transition: "color 0.3s ease"
                    }}
                    fontWeight={500}
                >
                    <Text>Next: Portfolio</Text>
                    <IoIosArrowForward size={20} />
                </Link>
            </Flex>
        </Container>
    </Box>
);

export default HomeBox;