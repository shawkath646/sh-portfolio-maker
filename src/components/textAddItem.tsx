"use client";
import { useRef } from 'react';
import { FormControl, FormLabel, Flex, Text, IconButton, Input, Button, FormErrorMessage } from '@chakra-ui/react';
import { Control, Controller, ControllerRenderProps, FieldError, UseFormClearErrors, UseFormSetError, Merge } from 'react-hook-form';
import * as yup from 'yup';
import { MdDelete } from 'react-icons/md';




const TextAddItem: React.FC<{
    name: string,
    control: Control<any>
    error?: Merge<FieldError, (FieldError | undefined)[]> | undefined,
    label?: string;
    clearErrors: UseFormClearErrors<any>,
    setError: UseFormSetError<any>
    maxLength?: number,
    maxItems?: number,
    fieldType?: "text" | "email" | "url"
}> = ({
    error,
    control,
    name,
    label,
    clearErrors,
    setError,
    maxLength,
    maxItems,
    fieldType = "text"
}) => {

        const titleRef = useRef<HTMLInputElement | null>(null);

        const handleAddTitle = (field: ControllerRenderProps<any, string>) => {
            if (titleRef.current) {
                const titleValue = titleRef.current.value;
                clearErrors(name);

                const textValidationSchema = yup.string()
                    .when([], () => {
                        if (fieldType === "url") return yup.string().required('Title is required').url("Invalid URL detected");
                        else if (fieldType === "email") return yup.string().required('Title is required').email("Invalid email detected");
                        else return yup.string().required('Title is required').min(3, 'Minimum 3 characters required');
                    });
                try {
                    textValidationSchema.validateSync(titleValue);
                } catch (error: any) {
                    setError(name, { message: error.message });
                    return;
                };
                if (maxLength && titleValue.length >= maxLength){
                    setError(name, { message: `Maximum ${maxLength} characters allowed` });
                    return;
                };
                if (field.value.includes(titleValue)) {
                    setError(name, { message: "Item already exists" });
                    return;
                };

                if (maxItems && field.value.length >= maxItems) {
                    setError(name, { message: `Maximum item ${maxItems} reached` });
                    return;
                }

                field.onChange([...field.value, titleValue]);
                titleRef.current.value = "";
            }
        };

        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControl isInvalid={!!error}>
                        <FormLabel>{label || name}:</FormLabel>
                        {field.value.length > 0 ? field.value.map((item: string, index: number) => (
                            <Flex
                                key={index}
                                py={1}
                                px={2}
                                justifyContent="space-between"
                                alignItems="center"
                                bgColor="#f1f5f9"
                                rounded="md"
                                mb={2}
                            >
                                <Text fontSize="sm" isTruncated>{item}</Text>
                                <IconButton
                                    icon={<MdDelete size={20} />}
                                    aria-label="Add title"
                                    variant="none"
                                    h={6}
                                    w={6}
                                    color="#f43f5e"
                                    _hover={{
                                        color: "#e11d48",
                                        transition: "color 0.3s ease",
                                    }}
                                    onClick={() => {
                                        const filteredValue = field.value.filter((title: string) => title !== item);
                                        field.onChange(filteredValue);
                                    }}
                                />
                            </Flex>
                        )) : (
                            <Text fontSize="sm" color="#64748b">No item added</Text>
                        )}
                        <Flex alignItems="center" mt={2} gap={3}>
                            <Input type="text" size="sm" ref={titleRef} />
                            <Button size="sm" onClick={() => handleAddTitle(field)}>
                                Add
                            </Button>
                        </Flex>
                        <FormErrorMessage>{error?.message}</FormErrorMessage>
                    </FormControl>
                )}
            />
        );
    };

export default TextAddItem;
