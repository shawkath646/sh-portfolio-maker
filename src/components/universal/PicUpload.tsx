import Image from "next/image";
import { useRef } from "react";
import { Box, Button, Center, FormControl, FormLabel, Icon, Text } from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { PicUploadType } from "@/types/types";


export default function PicUpload({ currentImage, onRemove, selectedImage, onChange, label }: PicUploadType) {

    const inputRef = useRef();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target) return;
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataURL = event.target?.result as string;
                onChange(dataURL);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    

    const ImageView = ({ src }) => {
        return (
            <Box>
                <Image
                    src={src}
                    alt="Selected Image"
                    height={150}
                    width={150}
                    className="rounded"
                />
                <Center>
                    <Button
                        colorScheme="red"
                        variant="outline"
                        marginY={5}
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                </Center>
            </Box>
        );
    }

    return (
        <FormControl width={150} marginX="auto">
            <FormLabel>{label}</FormLabel>
            {selectedImage ? (
                <ImageView src={selectedImage} />
            ) : currentImage ? (
                <ImageView src={currentImage} />
            ) : (
                <Box
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="8px"
                    textColor="gray.500"
                    onClick={() => inputRef.current.click()}
                    cursor="pointer"
                    _hover={{
                        borderColor: "blue.600",
                        textColor: "blue.600"
                    }}
                    height={110}
                    width={120}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                >
                    <Box textAlign="center">
                        <Icon as={AiOutlineCloudUpload} boxSize={6} />
                        <Text>Upload File</Text>
                    </Box>
                </Box>
            )}
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleChange}
                hidden
            />
        </FormControl>
    );
}