"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
    Heading,
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
    Box,
    Text,
    Center,
    Icon
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import ItemDeleteModal from "@/components/modal/itemDelete.modal";
import removeProjectItem from "@/actions/database/projects/removeProjectItem";
import formatDate from "@/utils/formatDate";
import { ProjectItemType } from "@/types/types";
import { FaGithub, FaFile, FaExternalLinkAlt, FaRegImages } from "react-icons/fa";



const ProjectFrame: React.FC<{
    username: string;
    item: ProjectItemType,
    setProjectItemsArray: Dispatch<SetStateAction<ProjectItemType[]>>;
    setCurrentItem: Dispatch<SetStateAction<ProjectItemType | null>>;
    onModalOpen: () => void;
}> = ({
    username,
    item,
    setProjectItemsArray,
    setCurrentItem,
    onModalOpen
}) => {

        const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <>
                <Box p={4} borderWidth="1px" boxShadow="md" bg="#fff" rounded="xl" w="350px">
                    <Box position="relative" height="120px" mb={38}>
                        {item.coverImage ? (
                            <Image src={item.coverImage} alt={`${item.name} cover`} fill style={{ borderRadius: "0.7rem" }} />
                        ) : (
                            <Center position="absolute" w="full" h="full" bgColor="#e2e8f0">
                                <FaRegImages size={50} />
                            </Center>
                        )}
                        <Box
                            position="absolute"
                            bottom={0}
                            left="50%"
                            transform="translateX(-50%)"
                            mb={-27}
                            borderRadius="full"
                            overflow="hidden"
                            border="4px solid white"
                            bgColor="#fff"
                        >
                            <Image
                                src={item.icon}
                                alt={`${item.name} icon`}
                                height={70}
                                width={70}
                                style={{
                                    height: "67px", width: "70px"
                                }}
                            />
                        </Box>
                    </Box>
                    <Popover>
                        <PopoverTrigger>
                            <Heading as="h3" fontWeight={500} fontSize="xl" mb={2}>{item.name}</Heading>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Name</PopoverHeader>
                            <PopoverBody>{item.name}</PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <Text fontSize="sm" mb={1}>
                        <Text as="span" fontWeight={500}>Type:</Text>
                        &nbsp;{item.type}
                    </Text>
                    <Text fontSize="sm" mb={1}>
                        <Text as="span" fontWeight={500}>Duration:</Text>
                        &nbsp;{formatDate(item.startsFrom as Date)} - {item.endsOn ? formatDate(item.endsOn as Date) : "Present"}
                    </Text>
                    <Box mt={4} h="22px">
                        {item.description && (
                            <Link href={`/p/${username}/projects/${item.id}`} fontSize="sm" mr={2}><Icon as={FaFile} mr={1} />Project</Link>
                        )}
                        {item.sourceLink && (
                            <Link href={item.sourceLink} isExternal fontSize="sm" mr={2}><Icon as={FaGithub} mr={1} />Source</Link>
                        )}
                        {item.liveLink && (
                            <Link href={item.liveLink} isExternal fontSize="sm" mr={2}><Icon as={FaExternalLinkAlt} mr={1} />Live</Link>
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
                        await removeProjectItem(item.id);
                        setProjectItemsArray(prev => prev.filter(prevItem => prevItem !== item))
                    }}
                />
            </>
        );
    };

export default ProjectFrame;