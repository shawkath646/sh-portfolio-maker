"use client";
import { GridItem, Heading, List, ListItem, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import AnimatedComponent from "../universal/AnimateComponent";

export default function Skills({ data }) {
    return (
        <AnimatedComponent
            as="section"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.75, delay: 0.5 } },
            }}
            className="pt-16 px-2"
        >
            <Stack spacing={5} textAlign="center">
                <Heading as='h2' size='2xl'>Skills</Heading>
                <Text fontSize="lg">Skills become our greatest assets when fueled by curiosity and crafted with dedication, unlocking the door to endless possibilities.</Text>
            </Stack>
            <SimpleGrid mt={10} columns={[1, 1, 2, 2, 3]} spacing={2}>
                <GridItem>
                    <Text fontSize="xl" fontWeight="bold" bgColor="lightblue" p={4} rounded={2}>WEB DEVELOPMENT</Text>
                    <List as={SimpleGrid} columns={2} p={2} gap={4}>
                        <ListItem as={Stack} fontSize="xl" p={2} border="solid" borderColor="gray" rounded={10} borderWidth={2}>

                            <Text>NodeJS</Text>
                        </ListItem>
                        <ListItem as={Stack} fontSize="xl" p={6}>
                            <Text>NodeJS</Text>
                        </ListItem>
                        <ListItem as={Stack} fontSize="xl" p={6}>
                            <Text>NodeJS</Text>
                        </ListItem>
                        <ListItem as={Stack} fontSize="xl" p={6}>
                            <Text>NodeJS</Text>
                        </ListItem>
                    </List>
                </GridItem>
                <GridItem>
                    <Text fontSize="xl" fontWeight="bold" bgColor="lightgreen" p={4} rounded={2}>WEB DEVELOPMENT</Text>
                </GridItem>
                <GridItem>
                    <Text fontSize="xl" fontWeight="bold" bgColor="lightyellow" p={4} rounded={2}>WEB DEVELOPMENT</Text>
                </GridItem>
            </SimpleGrid>
        </AnimatedComponent>
    );
}