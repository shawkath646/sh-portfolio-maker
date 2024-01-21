import { useRef } from "react";
import { Box, Center, Flex, FormLabel, Icon, Text } from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import randomId from "@/lib/randomId";


export default function GalleryPicUpload({ onChange, label, ...props }) {

    const inputRef = useRef();

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
      
        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            onChange((prev) => [
              ...prev,
              {
                id: randomId(16),
                image: reader.result,
              },
            ]);
          };
          reader.readAsDataURL(file);
        });
    };

    return (
        <Box as={Center} marginX="auto" {...props}>
            <FormLabel>{label}</FormLabel>
            <Box
                as={Flex}
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
                alignItems="center"
                justifyContent="center"
                mx="auto"
            >
                <Box textAlign="center">
                    <Icon as={AiOutlineCloudUpload} boxSize={6} />
                    <Text>Upload File</Text>
                </Box>
            </Box>
            <input
                type="file"
                accept="image/*"
                multiple
                ref={inputRef}
                onChange={handleImageChange}
                hidden
            />
        </Box>
    );
}