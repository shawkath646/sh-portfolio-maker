"use client";
import NextImage from "next/image";
import { useRef } from "react";
import {
    Heading,
    Divider,
    Flex,
    Box,
    FormControl,
    Input,
    Text,
    Button,
    FormErrorMessage,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Center,
    Icon
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PartialBy, MiniGalleryItemType } from "@/types/types";
import { MdOutlineFileUpload } from "react-icons/md";

interface MiniGalleryFormType {
    miniGalleryItems: PartialBy<MiniGalleryItemType, "id">[]
}

const ProfileMiniGallery = ({ miniGalleryItems }: { miniGalleryItems: MiniGalleryItemType[] }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        control,
        clearErrors,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<MiniGalleryFormType>({
        defaultValues: {
            miniGalleryItems
        }
    });

    const onSubmit: SubmitHandler<MiniGalleryFormType> = async (data) => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as="h5" size="lg" mt={10} mb={1}>Mini Gallery</Heading>
                <Divider />
                <Controller
                    name="miniGalleryItems"
                    control={control}
                    render={({ field }) => {
                        const addPhotoRef = useRef<HTMLInputElement | null>(null);
                        return (
                            <FormControl isInvalid={!!errors.miniGalleryItems}>
                                <Flex wrap="wrap" gap={4} mt={4} justifyContent="center">
                                    {field.value.map((item, index) => (
                                        <Box key={index}>
                                            <NextImage
                                                src={item}
                                                alt="Mini Gallery item"
                                                height={item.height}
                                                width={item.width}
                                                style={{
                                                    height: "140px",
                                                    width: "140px",
                                                    objectFit: "cover",
                                                    borderRadius: "5px"
                                                }}
                                            />
                                            <Button
                                                w="full"
                                                colorScheme="red"
                                                variant="outline"
                                                size="sm"
                                                mt={2}
                                                onClick={() => {
                                                    const filteredMiniGalleryItem = field.value.filter(prevItem => prevItem !== item);
                                                    field.onChange(filteredMiniGalleryItem);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}
                                    <Box>
                                        <Button
                                            as={Center}
                                            variant="none"
                                            cursor="pointer"
                                            h="140px"
                                            w="140px"
                                            border="2px solid #94a3b8"
                                            rounded="lg"
                                            onClick={() => {
                                                if (addPhotoRef.current) addPhotoRef.current.click();
                                            }}
                                        >
                                            <Box color="#94a3b8">
                                                <Icon as={MdOutlineFileUpload} h={8} w={8} display="block" mx="auto" />
                                                <Text>Upload</Text>
                                            </Box>
                                        </Button>
                                        <FormErrorMessage>{errors.miniGalleryItems?.message}</FormErrorMessage>
                                    </Box>
                                    <Input
                                        type="file"
                                        ref={addPhotoRef}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files;

                                            clearErrors("miniGalleryItems");

                                            if (!files || files.length === 0) return;
                                            const file = files[0];

                                            if (file.size > 3 * 1024 * 1024) {
                                                setError("miniGalleryItems", { message: "File size can't exceed 3MB" });
                                                return;
                                            }

                                            if (field.value.length > 15) {
                                                setError("miniGalleryItems", { message: "Maximum item reached" });
                                                return;
                                            }

                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                const base64 = reader.result;
                                                if (typeof base64 !== "string") return;

                                                const img = new Image;
                                                img.onload = () => {
                                                    const fileObject: PartialBy<MiniGalleryItemType, "id"> = {
                                                        height: img.height,
                                                        width: img.width,
                                                        src: base64
                                                    };
                                                    field.onChange([...field.value, fileObject]);
                                                };
                                                img.src = base64;
                                            };
                                            reader.readAsDataURL(file);
                                        }}

                                        accept="NextImage/*"
                                        hidden
                                    />
                                </Flex>
                            </FormControl>
                        )
                    }}
                />
                <ButtonGroup mt={4} justifyContent="end" w="full">
                    <Button onClick={onOpen} colorScheme='green'>Reset</Button>
                    <Button type="submit" isLoading={isSubmitting} colorScheme='twitter'>Update Mini Gallery</Button>
                </ButtonGroup>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure you want to reset the changes?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Your all changes will revert. This action cannot be undone. This will restore the data to its previous state.
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                        >
                            Confirm Reset
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileMiniGallery;