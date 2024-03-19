"use client";
import { Fragment } from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import PhotoAlbum from "react-photo-album";
import NextJsImage from "@/components/universal/NextJsImage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GalleryDataType } from "@/types/types";




const GalleryBox = ({ username, galleryData }: { username: string, galleryData: GalleryDataType }) => {
    return (
        <Box
            as="main"
            w="full"
            bgColor="#f1f5f9"
        >
            <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
                {galleryData.collection.map((item, index) => (
                    <Fragment key={index}>
                        <Heading>{item.name}</Heading>
                        <PhotoAlbum
                            layout="rows"
                            photos={galleryData.galleryItems.filter(photo => photo.collectionId === item.collectionId)}
                            renderPhoto={NextJsImage}
                            defaultContainerWidth={1200}
                            sizes={{ size: "calc(100vw - 240px)" }}
                            spacing={10}
                        />
                    </Fragment>
                ))}
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                    mb={5}
                >
                    <Link
                        href={`/p/${username}/projects`}
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
                        <Text>Prev: Projects</Text>
                    </Link>
                    <Link
                        href={`/p/${username}/preferences`}
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
                        mt={3}
                        mb={5}
                    >
                        <Text>Next: Preferences</Text>
                        <IoIosArrowForward size={20} />
                    </Link>
                </Flex>
            </Container>
        </Box>
    );
};

export default GalleryBox;