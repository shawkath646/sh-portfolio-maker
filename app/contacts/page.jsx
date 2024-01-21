import { SimpleGrid } from "@chakra-ui/react";
import Item from "../../components/universal/ContactItem";

export default async function Page() {

    

    return (
        <SimpleGrid minChildWidth={180} gap={16} my={20}>
            <Item color="#3498db" src="" href="#" />
        </SimpleGrid>
    );
}