import { Button, Center, GridItem } from "@chakra-ui/react";
import ContactItem from "@/components/universal/ContactItem";

export default function AdminContactItem({ data, handleRemove }) {


    return (
        <GridItem w={200} mx="auto">
            <ContactItem
                color={data.color}
                icon={data.image}
                href={data.href}
            />
            <Center mt={5}>
                <Button
                    variant="outline"
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleRemove(data)}
                >
                    Remove
                </Button>
            </Center>
        </GridItem>
    );
}