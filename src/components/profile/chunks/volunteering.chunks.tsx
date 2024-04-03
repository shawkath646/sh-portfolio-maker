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
import { VolunteeringItemType } from "@/types/types";
import removeVolunteeringItem from "@/actions/database/portfolio/removeVolunteeringItem";

const VolunteeringFrame: React.FC<{
    item: VolunteeringItemType,
    index: number,
    setVolunteeringItemsArray: Dispatch<SetStateAction<VolunteeringItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<VolunteeringItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    index,
    setVolunteeringItemsArray,
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
                    h="260px"
                >
                    <Popover>
                        <PopoverTrigger>
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.role}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Role</PopoverHeader>
                            <PopoverBody>{item.role}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Organization:</Text>
                                &nbsp;{item.organization}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Organization:</PopoverHeader>
                            <PopoverBody>{item.organization}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Purpose:</Text>
                        &nbsp;{item.purpose}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Duration:</Text>
                        &nbsp;{formatDate(item.startsFrom as Date)} - {item.endsOn ? formatDate(item.endsOn as Date) : "Present"}
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
                    onDelete={async() => {
                        await removeVolunteeringItem(item.id);
                        setVolunteeringItemsArray(prev => prev.filter(prevItem => item !== prevItem));
                    }}
                />
            </>
        );
    };

export default VolunteeringFrame;