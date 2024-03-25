import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import { Heading, Divider, Text, UnorderedList, ListItem, OrderedList, Table, Th, Td, Thead, Tbody, Input, Checkbox } from "@chakra-ui/react";
import js_beautify from "js-beautify";
import { Options } from "react-markdown";



const chakraRemarkComponents: Options["components"] = {
    h1(props) {
        const { children } = props;
        return (
            <>
                <Heading as="h1" size='xl' mb={2} mt={3}>{children}</Heading>
                <Divider mb={3} />
            </>
        );
    },
    h2(props) {
        const { children } = props;
        return (
            <>
                <Heading as='h2' size='lg' mb={2} mt={3}>{children}</Heading>
                <Divider mb={3} />
            </>
        );
    },
    h3(props) {
        const { children } = props;
        return (
            <>
                <Heading as="h3" size='md' mb={2} mt={3}>{children}</Heading>
                <Divider mb={3} />
            </>
        );
    },
    h4(props) {
        const { children } = props;
        return (
            <>
                <Heading as='h4' size='sm' mb={2} mt={3}>{children}</Heading>
                <Divider mb={3} />
            </>
        );
    },
    h5(props) {
        const { children } = props;
        return (
            <>
                <Heading as="h5" size='sm' mb={2} mt={3}>{children}</Heading>
                <Divider mb={3} />
            </>
        );
    },
    h6(props) {
        const { children } = props;
        return (
            <>
                <Heading as='h6' size='xs' mb={2} mt={3}>{children}</Heading>
                <Divider mb={3} />
            </>
        );
    },
    code(props) {
        const { children } = props;
        return (
            <Text
                as="code"
                color="#334155"
                bgColor="#e2e8f0"
                display="inline-flex"
                mt={1}
                px={2}
                py={0.5}
                rounded="md"
                style={{ textWrap: "wrap" }}
            >
                {js_beautify(children as string)}
            </Text>
        );
    },
    ul: UnorderedList,
    ol(props) {
        const { children } = props;
        return (
            <OrderedList>{children}</OrderedList>
        );
    },
    li: ListItem,
    a(props) {
        const { children, href } = props;
        return (
            <Link
                href={href || "#"}
                color="#3b82f6"
                isExternal
                _hover={{
                    textDecoration: "none",
                    color: "#1d4ed8",
                    transition: "color 0.3s ease"
                }}
            >
                {children}
            </Link>
        );
    },
    p(props) {
        const { children } = props;
        return (
            <Text my={2}>{children}</Text>
        );
    },
    hr() {
        return (
            <Divider my={3} />
        );
    },
    img(props) {
        const { src, alt = "No alternative text", height = 200, width = 200 } = props;
        if (src?.includes("https://lh3.googleusercontent.com")) return (
            <Image src={src} alt={alt} height={Number(height)} width={Number(width)} />
        );
        return (
            <img src={src} alt={alt} height={Number(height)} width={Number(width)} />
        );
    },
    table: Table,
    thead: Thead,
    tbody: Tbody,
    th: Th,
    td: Td,
    input(props) {
        const {
            type = "text",
            value = "",
            onChange = () => { },
            checked = false,
            placeholder = "",
            ...rest
        } = props;

        if (type === "checkbox") return (
            <Checkbox size='md' colorScheme='blue' defaultChecked={checked} onChange={onChange} mt={1} />
        );
        if (type === "text") return (
            <Input value={value} onChange={onChange} placeholder={placeholder} />
        );
        return (
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} {...rest} />
        );
    },
};

export default chakraRemarkComponents;