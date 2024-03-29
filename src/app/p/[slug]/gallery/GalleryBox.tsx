"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Modal,
    ModalOverlay,
    ModalHeader,
    useDisclosure,
    Button,
    CloseButton,
    Center
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { motion } from "framer-motion";
import { GalleryDataType, GalleryItemType } from "@/types/types";
import { AiFillPicture } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoWarning } from "react-icons/io5";




const GalleryBox = ({ username, galleryData }: { username: string, galleryData: GalleryDataType }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPic, setCurrentPic] = useState<GalleryItemType | null>(null);

    return (
        <>
            <Box
                as="main"
                w="full"
                bgColor="#f1f5f9"
            >
                <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
                    {galleryData.collection.length > 0 ? galleryData.collection.map((item, index) => {
                        const filteredItems = galleryData.galleryItems.filter(photo => photo.collectionId === item.collectionId);
                        return filteredItems.length && (
                            <Fragment key={index}>
                                <Flex justifyContent="center" alignItems="center" gap={2} mb={6}>
                                    <Box p={2.5} bg="#d1fae5" borderRadius="full" color="#10b981">
                                        <AiFillPicture size={20} />
                                    </Box>
                                    <Heading fontSize={["2xl", "3xl"]}>{item.name}</Heading>
                                </Flex>
                                <Flex wrap="wrap" gap={5} justifyContent={["center", "space-between"]}>
                                    {filteredItems.map((photo, index) => (
                                        <Box
                                            key={index}
                                            as={motion.div}
                                            padding="15px"
                                            bgColor="#fff"
                                            boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
                                            h="250px"
                                            w="180px"
                                            onClick={() => {
                                                setCurrentPic(photo);
                                                onOpen();
                                            }}
                                            initial={{
                                                opacity: 0,
                                                scale: 0
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                                transition: {
                                                    duration: 1,
                                                    delay: index * 0.2
                                                }
                                            }}
                                            whileHover={{
                                                scale: 0.95,
                                                transition: {
                                                    duration: 0.3
                                                }
                                            }}
                                            viewport={{ once: true }}
                                        >
                                            <Image
                                                src={photo}
                                                alt={`Gallery item ${index}`}
                                                height={220}
                                                width={150}
                                                style={{ height: "220px", width: "150px", objectFit: "cover", objectPosition: "center" }}
                                            />
                                        </Box>
                                    ))}
                                </Flex>
                            </Fragment>
                        )
                    }) : (
                        <Box as={Center} minH="60vh" gap={3}>
                            <IoWarning size={26} />
                            <Text fontSize="24px">No gallery collection found.</Text>
                        </Box>
                    )}
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        mt={8}
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
                        >
                            <Text>Next: Preferences</Text>
                            <IoIosArrowForward size={20} />
                        </Link>
                    </Flex>
                </Container>
            </Box>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setCurrentPic(null);
                }}
                closeOnOverlayClick={false}
            >
                <ModalOverlay bgColor="rgba(0, 0, 0, 0.7)" />
                <Box position="fixed" top={0} left={0} height="full" width="full" zIndex={99999}>
                    <Container maxW={1536} mx="auto" pt={5} overflow="hidden" height="100vh">
                        <ModalHeader mb="40px">
                            <CloseButton
                                onClick={() => {
                                    onClose();
                                    setCurrentPic(null);
                                }}
                                ml="auto"
                                size="xl"
                                color="#fff"
                                _hover={{
                                    color: "#cbd5e1",
                                    transition: "color 0.3 ease"
                                }}
                            />
                        </ModalHeader>
                        {(() => {
                            const filteredArray = galleryData.galleryItems.filter(item => item.collectionId === currentPic?.collectionId);
                            const currentIndex = filteredArray.findIndex(item => item === currentPic);
                            const hasPrevious = currentIndex > 0;
                            const hasNext = currentIndex !== -1 && currentIndex + 1 < filteredArray.length;
                            return (
                                <Box display="flex" alignItems="center" width="full" gap={4}>
                                    <Button
                                        variant="none"
                                        size="xl"
                                        color="#fff"
                                        _hover={{
                                            color: "#cbd5e1",
                                            transition: "color 0.3 ease"
                                        }}
                                        onClick={() => {
                                            if (hasPrevious) {
                                                setCurrentPic(filteredArray[currentIndex - 1]);
                                            }
                                        }}
                                        isDisabled={!hasPrevious}
                                    >
                                        <IoIosArrowBack size={30} />
                                    </Button>
                                    {currentPic && (
                                        <Center width="full">
                                            <Image
                                                src={currentPic.src}
                                                alt="View gallery item"
                                                width={currentPic.width}
                                                height={currentPic.height}
                                                style={{
                                                    height: "70vh",
                                                    width: "auto"
                                                }}
                                            />
                                        </Center>
                                    )}
                                    <Button
                                        variant="none"
                                        size="xl"
                                        color="#fff"
                                        _hover={{
                                            color: "#cbd5e1",
                                            transition: "color 0.3 ease"
                                        }}
                                        onClick={() => {
                                            if (hasNext) {
                                                setCurrentPic(filteredArray[currentIndex + 1]);
                                            }
                                        }}
                                        isDisabled={!hasNext}
                                    >
                                        <IoIosArrowForward size={30} />
                                    </Button>
                                </Box>
                            );
                        })()}
                    </Container>
                </Box>
            </Modal>
        </>
    );
};

export default GalleryBox;