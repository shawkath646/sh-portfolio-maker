"use client";
import { List, ListItem, Text, ListIcon, Stack } from "@/lib/ChakraUIReactClient";
import { CiCircleCheck } from "react-icons/ci";

const FeaturesList = () => (
    <List spacing={3} pl={5} mt={3} color="#fbbf24">
        <ListItem as={Stack} alignItems="center" direction="row">
            <ListIcon as={CiCircleCheck} />
            <Text>Login</Text>
        </ListItem>
        <ListItem as={Stack} alignItems="center" direction="row">
            <ListIcon as={CiCircleCheck} />
            <Text>Add Your Portfolio Data</Text>
        </ListItem>
        <ListItem as={Stack} alignItems="center" direction="row">
            <ListIcon as={CiCircleCheck} />
            <Text>Share with the World</Text>
        </ListItem>
    </List>
);

export default FeaturesList;