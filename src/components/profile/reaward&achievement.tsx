"use client";
import { Fragment, useState } from "react";
import {
    Heading,
    Divider,
    Button,
    ButtonGroup,
    GridItem,
    Popover,
    SimpleGrid,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useDisclosure,
    Box,
    Text,
    Flex,
    IconButton,
    Center
} from "@chakra-ui/react";
import ProfileReawardAndAchievementModal from "@/components/modal/reaward&achievement.modal";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import formatDate from "@/utils/formatDate";
import { ReawardsType } from "@/types/types";
import { FaPlus } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";


const ProfileReawardAndAchevement: React.FC<{ reawardAndAchievementItems: ReawardsType[] }> = ({ reawardAndAchievementItems }) => {

    const [reawardAndAchievementItemsArray, setReawardAndAchievementItemsArray] = useState<ReawardsType[]>(reawardAndAchievementItems);
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const [currentItem, setCurrentItem] = useState<ReawardsType | null>(null);

    return (
        <>
            <Flex alignItems="center" justifyContent="space-between" mb={1} mt="35px">
                <Heading as="h5" size="lg">Reaward & Achievement</Heading>
                <IconButton aria-label="add reaward & achievement item" icon={<FaPlus />} onClick={onModalOpen} />
            </Flex>
            <Divider />

            {reawardAndAchievementItemsArray.length > 0 ? (
                <SimpleGrid flex="1" columns={[1, 1, 1, 2, 2, 3]} gap={4} mt={2}>
                    {reawardAndAchievementItemsArray.map((item, index) => (
                        <Fragment key={index}>
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
                            </Box>
                            <ItemDeleteModal
                                isOpen={isAlertOpen}
                                onClose={onAlertClose}
                                onDelete={() => {
                                    setReawardAndAchievementItemsArray(prev => prev.filter(prevItem => item !== prevItem));
                                }}
                            />
                        </Fragment>
                    ))}
                </SimpleGrid>
            ) : (
                <Box as={Center} h="350px">
                    <Flex alignItems="center" gap={2}>
                        <IoIosWarning size={24} />
                        <Text fontSize="lg">No item added</Text>
                    </Flex>
                </Box>
            )}
            <ProfileReawardAndAchievementModal
                currentItem={currentItem}
                isOpen={isModalOpen}
                onClose={onModalClose}
                setCurrentItem={setCurrentItem}
                setReawardAndAchievementArray={setReawardAndAchievementItemsArray}
            />
        </>
    );
};

export default ProfileReawardAndAchevement;