import Image from "next/image";
import { Link } from "@chakra-ui/next-js";
import { Heading, Divider, Text, UnorderedList, ListItem, OrderedList, Table, Th, Td, Thead, Tbody, Input, Checkbox } from "@chakra-ui/react";
import js_beautify from "js-beautify";
import { Options } from "react-markdown";

const chakraRemarkComponents: Options["components"] = {
    h1: (props) => <Heading as="h1" size="2xl" mt={8} mb={4} fontSize="2rem">{props.children}</Heading>,
    h2: (props) => <Heading as="h2" size="xl" mt={6} mb={3} fontSize="1.5rem">{props.children}</Heading>,
    h3: (props) => <Heading as="h3" size="lg" mt={5} mb={2} fontSize="1.25rem">{props.children}</Heading>,
    h4: (props) => <Heading as="h4" size="md" mt={4} mb={1} fontSize="1.125rem">{props.children}</Heading>,
    h5: (props) => <Heading as="h5" size="sm" mt={3} mb={1} fontSize="1rem">{props.children}</Heading>,
    h6: (props) => <Heading as="h6" size="xs" mt={2} mb={1} fontSize="0.875rem">{props.children}</Heading>,
    code: (props) => (
        <Text
            as="code"
            color="#334155"
            bgColor="#e2e8f0"
            display="inline-flex"
            mt={2}
            mb={2}
            px={2}
            py={1}
            rounded="md"
            style={{ whiteSpace: "pre-wrap" }}
            fontSize="0.875rem"
        >
            {js_beautify(props.children as string)}
        </Text>
    ),
    ul: UnorderedList,
    ol: OrderedList,
    li: ListItem,
    a: (props) => (
        <Link
            href={props.href || "#"}
            color="#3b82f6"
            isExternal
            _hover={{
                textDecoration: "none",
                color: "#1d4ed8",
                transition: "color 0.3s ease"
            }}
            display="inline-block"
            fontSize="1rem"
        >
            {props.children}
        </Link>
    ),
    p: (props) => <Text my={3} fontSize="1rem">{props.children}</Text>,
    hr: () => <Divider my={4} />,
    img: (props) => {
        const { src, alt = "No alternative text", height = 200, width = 200 } = props;
        if (src?.includes("https://lh3.googleusercontent.com")) {
            return <Image src={src} alt={alt} height={Number(height)} width={Number(width)} />;
        } else {
            return <img src={src} alt={alt} height={Number(height)} width={Number(width)} />;
        }
    },
    table: Table,
    thead: Thead,
    tbody: Tbody,
    th: Th,
    td: Td,
    input: (props) => {
        const { type = "text", value = "", onChange = () => { }, checked = false, placeholder = "", ...rest } = props;
        if (type === "checkbox") {
            return <Checkbox size="md" colorScheme="blue" defaultChecked={checked} onChange={onChange} mt={2} mb={2} />;
        } else if (type === "text") {
            return <Input value={value} onChange={onChange} placeholder={placeholder} />;
        } else {
            return <input type={type} value={value} onChange={onChange} placeholder={placeholder} {...rest} />;
        }
    },
};

export default chakraRemarkComponents;
