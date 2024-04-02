"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
    Button,
    ButtonGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useDisclosure,
    Text,
    Card,
    CardBody,
    Center,
    Heading,
} from "@chakra-ui/react";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import { FeaturedItemType } from "@/types/types";
import removeFeaturedItem from "@/actions/database/home/removeFeaturedItem";

const FeaturedFrame: React.FC<{
    item: FeaturedItemType,
    setFeaturedItemsArray: Dispatch<SetStateAction<FeaturedItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<FeaturedItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    setFeaturedItemsArray,
    setCurrentItem,
    onModalOpen
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <>
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
                                onClick={onOpen}
                            >
                                Remove
                            </Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
                <ItemDeleteModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={async() => {
                        await removeFeaturedItem(item.id);
                        setFeaturedItemsArray(prev => prev.filter(prevItem => prevItem !== item));
                    }}
                />
            </>
        );
    };

export default FeaturedFrame;