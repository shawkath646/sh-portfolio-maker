"use client";
import { useState, useRef } from "react";
import { Stack, FormControl, FormLabel, Button, Flex, Text, FormErrorMessage, Input } from "@chakra-ui/react";
import { Controller, Control, FieldError, UseFormClearErrors, UseFormSetError } from 'react-hook-form';

interface FileSelectorProps {
    label?: string;
    control: Control<any>;
    name: string;
    defaultValue?: string;
    error?: FieldError;
    clearErrors: UseFormClearErrors<any>;
    setError: UseFormSetError<any>
}

const FileSelector: React.FC<FileSelectorProps> = ({
    label = "Select picture",
    control,
    name,
    defaultValue = '',
    error,
    clearErrors,
    setError,
}) => {
    const [fileName, setFileName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Stack as={FormControl} gap={0} isInvalid={!!error}>
            <FormLabel>{label}:</FormLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <>
                        <Flex alignItems="center" gap={4}>
                            <Button
                                flex="0.5"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Select file
                            </Button>
                            <Text flex="1" isTruncated>{fileName || field.value}</Text>
                        </Flex>
                        <Input
                            type="file"
                            ref={fileInputRef}
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
                                setFileName(file.name);
                                reader.readAsDataURL(file);
                            }}
                            accept=".md"
                            hidden
                        />
                    </>
                )}
            />
            <FormErrorMessage>{error?.message}</FormErrorMessage>
        </Stack>
    );
};


export default FileSelector;