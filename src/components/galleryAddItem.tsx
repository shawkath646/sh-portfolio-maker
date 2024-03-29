"use client";
import { useRef, useState } from 'react';
import { Box, Button, Center, Icon, Text, Input, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { MdOutlineFileUpload } from 'react-icons/md';

interface FileObjectType {
    height: number;
    width: number;
    src: string;
}

const GalleryAddItem: React.FC<{
    onItemAdd: (fileObject: FileObjectType[]) => void,
    maxLength?: number,
    length?: number
}> = ({
    onItemAdd,
    maxLength,
    length
}) => {
        const [errorMessage, setErrorMessage] = useState("");
        const addImageRef = useRef<HTMLInputElement | null>(null);

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;

            setErrorMessage("");

            if (!files || files.length === 0) return;

            const newItems: FileObjectType[] = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > 3 * 1024 * 1024) {
                    setErrorMessage("File size can't exceed 3MB");
                    continue;
                }

                if (length && maxLength && (length >= maxLength)) {
                    setErrorMessage("Maximum items reached");
                    break;
                }
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result;
                    if (typeof base64 !== "string") return;

                    const img = new Image();
                    img.onload = () => {
                        const fileObject = {
                            height: img.height,
                            width: img.width,
                            src: base64
                        };
                        newItems.push(fileObject);
                        if (i === files.length - 1) {
                            onItemAdd(newItems);
                        }
                    };
                    img.src = base64;
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <FormControl w="140px" isInvalid={!!errorMessage}>
                <Button
                    as={Center}
                    variant="none"
                    cursor="pointer"
                    h="140px"
                    w="140px"
                    border="2px solid #94a3b8"
                    rounded="lg"
                    onClick={() => addImageRef.current?.click()}
                >
                    <Box color="#94a3b8">
                        <Icon as={MdOutlineFileUpload} h={8} w={8} display="block" mx="auto" />
                        <Text>Upload</Text>
                    </Box>
                </Button>
                {errorMessage && <FormErrorMessage textAlign="center">{errorMessage}</FormErrorMessage>}
                <Input
                    type="file"
                    ref={addImageRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    hidden
                />
            </FormControl>
        );
    };

export default GalleryAddItem;
