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
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import formatDate from "@/utils/formatDate";
import { WorkExperienceItemType } from "@/types/types";
import { MdWorkspaces } from "react-icons/md";

const WorkExperienceFrame: React.FC<{
    item: WorkExperienceItemType,
    index: number,
    setWorkExperienceItemsArray: Dispatch<SetStateAction<WorkExperienceItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<WorkExperienceItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    index,
    setWorkExperienceItemsArray,
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
                    h="375px"
                >
                    <Popover>
                        <PopoverTrigger>
                            <Text fontSize={["xl", "2xl"]} fontWeight="semibold" mb={2} isTruncated>{`${index + 1}. ${item.role}`}</Text>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Role</PopoverHeader>
                            <PopoverBody>{item.role}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Company:</Text>
                        &nbsp;{item.companyName}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Industry:</Text>
                        &nbsp;{item.industry}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Work Type:</Text>
                        &nbsp;{item.workType}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Location:</Text>
                        &nbsp;{item.location}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Location Type:</Text>
                        &nbsp;{item.locationType}
                    </Text>
                    <Text mb={2}>
                        <Text as="span" fontWeight="semibold">Duration:</Text>
                        &nbsp;{formatDate(item.startsFrom as Date)} - {item.endsOn ? formatDate(item.endsOn as Date) : "Present"}
                    </Text>
                    {item.description ? (
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
                    ) : (
                        <Box w="full" h="23px" mb={2}></Box>
                    )}
                    {item.skills.length > 0 ? (
                        <Popover>
                            <PopoverTrigger>
                                <Text isTruncated>
                                    <Text as="span" fontWeight="semibold">Skills:</Text>
                                    <Text as="span" color="#22c55e" fontWeight={500}>&nbsp;{item.skills.join(", ").toString()}</Text>
                                </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Skills</PopoverHeader>
                                <PopoverBody>
                                    <List>
                                        {item.skills.map((skill, index) => (
                                            <ListItem key={index} color="#10b981">
                                                <ListIcon as={MdWorkspaces} />
                                                {skill}
                                            </ListItem>
                                        ))}
                                    </List>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Box w="full" h="18px" mb={2}></Box>
                    )}
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
                        setWorkExperienceItemsArray(prev => prev.filter(prevItem => item !== prevItem));
                    }}
                />
            </>
        );
    };

export default WorkExperienceFrame;