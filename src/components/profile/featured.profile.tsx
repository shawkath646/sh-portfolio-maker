"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import {
    Heading,
    Divider,
    Flex,
    Card,
    CardBody,
    Center,
    Text,
    Button,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    IconButton,
    ButtonGroup
} from "@chakra-ui/react";
import ProfileFeaturedModal from "@/components/modal/featured.modal";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import { FeaturedItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";



const ProfileFeatured = ({ featuredItems }: { featuredItems: FeaturedItemType[] }) => {

    const [featuredItemsArray, setFeaturedItemsArray] = useState<FeaturedItemType[]>(featuredItems);
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();

    const [currentItem, setCurrentItem] = useState<FeaturedItemType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Education</Heading>
                <IconButton aria-label="add education item" icon={<FaPlus />} onClick={onModalOpen} />
            </Flex>
            <Divider />
            {featuredItemsArray.length > 0 ? (
                <Flex wrap="wrap" gap={5} mt={5} justifyContent="center">
                    {featuredItemsArray.map((item, index) => (
                        <Fragment key={index}>
                            <Card
                                w={["full", "375px"]}
                                bgColor={item.color}
                            >
                                <CardBody>
                                    <Center h="80px">
                                        {item.icon && (
                                            <Image
                                                src={item.icon}
                                                alt="Dream Card Thumbnail"
                                                width={80}
                                                height={80}
                                                style={{
                                                    height: "80px",
                                                    width: "80px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </Center>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Heading size="lg" textAlign="center" mb={2} h="40px" isTruncated>{item.title}</Heading>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Title</PopoverHeader>
                                            <PopoverBody>{item.title}</PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                    <Text h={["unset", "325px"]}>{item.description}</Text>
                                    <ButtonGroup w="full" justifyContent="flex-end">
                                        <Button
                                            variant="outline"
                                            colorScheme="green"
                                            size="sm"
                                            onClick={() => {
                                                setCurrentItem(item);
                                                onModalOpen();
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            colorScheme="red"
                                            size="sm"
                                            onClick={onAlertOpen}
                                        >
                                            Remove
                                        </Button>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>
                            <ItemDeleteModal
                                isOpen={isAlertOpen}
                                onClose={onAlertClose}
                                onDelete={() => {
                                    setFeaturedItemsArray(prev => prev.filter(prevItem => prevItem !== item));
                                }}
                            />
                        </Fragment>
                    ))}
                </Flex>
            ) : (
                <Text>cdml</Text>
            )}
            <ProfileFeaturedModal
                currentItem={currentItem}
                isOpen={isModalOpen}
                onClose={onModalClose}
                setCurrentItem={setCurrentItem}
                setFeaturedItemsArray={setFeaturedItemsArray}
            />
        </>
    );
};

export default ProfileFeatured;