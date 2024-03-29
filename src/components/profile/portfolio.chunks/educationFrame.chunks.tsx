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
import ProfileEducationModal from "@/components/modal/education.modal";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import formatDate from "@/utils/formatDate";
import { EducationItemType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

const EducationFrame: React.FC<{
    item: EducationItemType,
    index: number,
    setEducationItemsArray: Dispatch<SetStateAction<EducationItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<EducationItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    index,
    setEducationItemsArray,
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
                    h="318px"
                >
                    <Popover>
                        <PopoverTrigger>
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2}>{`${index + 1}. ${item.degree}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Degree</PopoverHeader>
                            <PopoverBody>{item.degree}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger>
                            <Text mb={2} isTruncated>
                                <Text as="span" fontWeight="semibold">Institute:</Text>
                                &nbsp;{item.institute}
                            </Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Institute</PopoverHeader>
                            <PopoverBody>{item.institute}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Type:</Text>
                        &nbsp;{item.type}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Field of study:</Text>
                        &nbsp;{item.field}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Grade:</Text>
                        &nbsp;{item.grade}
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
                    onDelete={() => {
                        setEducationItemsArray(prev => prev.filter(prevItem => item !== prevItem));
                    }}
                />
            </>
        );
    };

export default EducationFrame;