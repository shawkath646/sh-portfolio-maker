import { useRef } from 'react';
import { Stack, FormControl, FormLabel, Button, Input, FormErrorMessage, Image } from '@chakra-ui/react';
import { Controller, Control, FieldError, UseFormClearErrors, UseFormSetError } from 'react-hook-form';

interface ImageSelectorProps {
    label?: string;
    control: Control<any>;
    name: string;
    defaultValue?: string;
    error?: FieldError;
    clearErrors: UseFormClearErrors<any>;
    setError: UseFormSetError<any>
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ label = "Select picture", control, name, defaultValue = '', error, clearErrors, setError }) => {
    const featuredItemIconRef = useRef<HTMLInputElement | null>(null);

    return (
        <Stack as={FormControl} gap={0} isInvalid={!!error} maxW="200px">
            <FormLabel>{label}:</FormLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <>
                        {field.value && (
                            <Image
                                src={field.value}
                                alt={label}
                                height={73}
                                width={73}
                                style={{ height: "75px", width: "auto", margin: "0 auto 5px auto" }}
                            />
                        )}
                        <Button size="sm" onClick={() => featuredItemIconRef.current?.click()}>
                            {field.value ? "Change picture" : "Select picture"}
                        </Button>
                        {field.value && (
                            <Button
                                colorScheme="red"
                                size="sm"
                                my={1}
                                onClick={() => {
                                    field.onChange("");
                                    clearErrors(name);
                                }}
                            >
                                Remove picture
                            </Button>
                        )}
                        <Input
                            type="file"
                            ref={featuredItemIconRef}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const files = event.target.files;

                                clearErrors(name);

                                if (!files || files.length === 0) return;
                                const file = files[0];

                                if (file.size > 3 * 1024 * 1024) {
                                    setError(name, { message: "File size can't exceed 3MB" });
                                    return;
                                }

                                const reader = new FileReader();
                                reader.onload = () => {
                                    const base64 = reader.result;
                                    field.onChange(base64 as string);
                                };
                                reader.readAsDataURL(file);
                            }}
                            accept="image/*"
                            hidden
                        />
                    </>
                )}
            />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </Stack>
    );
};

export default ImageSelector;
