"use client";
import { Dispatch, SetStateAction } from "react";
import {
    Button,
    ButtonGroup,
    GridItem,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useDisclosure,
    Box,
    Text,
} from "@chakra-ui/react";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import formatDate from "@/utils/formatDate";
import { EventItemType } from "@/types/types";


const EventFrame: React.FC<{
    item: EventItemType,
    setEventItemsArray: Dispatch<SetStateAction<EventItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<EventItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    setEventItemsArray,
    setCurrentItem,
    onModalOpen
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <>
                <Box
                    as={GridItem}
                    p={6}
                    bg="#fff"
                    boxShadow="md"
                    borderRadius="lg"
                    h="180px"
                >
                    <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{formatDate(item.timestamp as Date)}</Text>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Title:</Text>
                                &nbsp;{item.title}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Description</PopoverHeader>
                            <PopoverBody>{item.title}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Box w="full" h="25px" mb={2}>
                        {item.description && (
                            <Popover>
                                <PopoverTrigger>
                                    <Text mb={2} isTruncated>
                                        <Text as="span" fontWeight="semibold">Description:</Text>
                                        &nbsp;{item.description}
                                    </Text>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Description</PopoverHeader>
                                    <PopoverBody>{item.description}</PopoverBody>
                                </PopoverContent>
                            </Popover>
                        )}
                    </Box>
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
                </Box>
                <ItemDeleteModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={() => {
                        setEventItemsArray(prev => prev.filter(prevItem => item !== prevItem));
                    }}
                />
            </>
        );
    };

export default EventFrame;