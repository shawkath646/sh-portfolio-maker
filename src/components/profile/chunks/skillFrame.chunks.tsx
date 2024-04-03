"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
    Flex,
    Text,
    Box,
    ButtonGroup,
    Button,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from "@chakra-ui/react";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import removeSkillItem from "@/actions/database/home/removeSkillItem";
import { SkillItemType } from "@/types/types";
import { MdWorkspaces } from "react-icons/md";


const SkillFrame: React.FC<{
    item: SkillItemType;
    setSkillItemsArray: Dispatch<SetStateAction<SkillItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<SkillItemType | null>>;
    onModalOpen: () => void;
}> = ({
    item,
    setSkillItemsArray,
    setCurrentItem,
    onModalOpen
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <>
                <Box w="220px">
                    <Flex alignItems="center" gap={4}>
                        {item.icon ? (
                            <Image src={item.icon} alt={`${item.name} icon`} height={42} width={42} style={{ objectFit: "cover", height: "42px", width: "42px" }} />
                        ) : (
                            <Box width="35px" height="35px" flex="none">
                                <MdWorkspaces size={24} style={{ color: "#0ea5e9", height: "35px", width: "35px" }} />
                            </Box>
                        )}
                        <Popover>
                            <PopoverTrigger>
                                <Text fontSize="20px" fontWeight={500} isTruncated>{item.name}</Text>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Skill Name</PopoverHeader>
                                <PopoverBody>{item.name}</PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                    <ButtonGroup alignItems="center" mt={2}>
                        <Button
                            onClick={() => {
                                setCurrentItem(item);
                                onModalOpen();
                            }}
                            variant="outline"
                            size="sm"
                            colorScheme="green"
                        >
                            Edit
                        </Button>
                        <Button onClick={onOpen} variant="outline" size="sm" colorScheme="red">Remove</Button>
                    </ButtonGroup>
                </Box>
                <ItemDeleteModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onDelete={async () => {
                        await removeSkillItem(item.id);
                        setSkillItemsArray(prev => prev.filter(prevItem => prevItem.id !== item.id));
                    }}
                />
            </>
        );
    };

export default SkillFrame;