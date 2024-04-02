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
import { ReawardAndAchievementItemType } from "@/types/types";

const ReawardAndAchievementFrame: React.FC<{
    item: ReawardAndAchievementItemType,
    index: number,
    setReawardAndAchievementItemsArray: Dispatch<SetStateAction<ReawardAndAchievementItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<ReawardAndAchievementItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    index,
    setReawardAndAchievementItemsArray,
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
                    h="220px"
                >
                    <Popover>
                        <PopoverTrigger>
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.title}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Title</PopoverHeader>
                            <PopoverBody>{item.title}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Issued By:</Text>
                                &nbsp;{item.issuedBy}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Issued By:</PopoverHeader>
                            <PopoverBody>{item.issuedBy}</PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Issued On:</Text>
                        &nbsp;{formatDate(item.issuedOn as Date)}
                    </Text>
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
                        setReawardAndAchievementItemsArray(prev => prev.filter(prevItem => item !== prevItem));
                    }}
                />
            </>
        );
    };

export default ReawardAndAchievementFrame;