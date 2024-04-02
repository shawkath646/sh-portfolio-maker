"use client";
import { FormControl, Input, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Control, Controller, FieldError, Merge } from "react-hook-form";


const DateSelector: React.FC<{
    name: string;
    control: Control<any>;
    error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
    label?: string;
}> = ({
    control,
    error,
    name,
    label
}) => {

        const getStringFromDate = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }


        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControl isInvalid={!!error}>
                        <FormLabel>{label || name}:</FormLabel>
                        <Input
                            type="date"
                            value={getStringFromDate(field.value)}
                            onChange={event => field.onChange(new Date(event.target.value))}
                        />
                        <FormErrorMessage>{error?.message}</FormErrorMessage>
                    </FormControl>
                )}
            />
        );
    };

export default DateSelector;