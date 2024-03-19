"use client";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import { Link } from '@chakra-ui/next-js';
import { TbWorldWww } from "react-icons/tb";

const Website = ({ href, index }: { href: string, index: number }) => (
    <Link
        href={href}
        target="_blank"
        _hover={{
            textDecoration: "none",
        }}
    >
        <Box
            as={motion.div}
            rounded="full"
            boxShadow="2xl"
            bg="#e2e8f0"
            color="#64748b"
            p={2.5}
            w="fit-content"
            h="fit-content"
            initial={{
                opacity: 0,
                y: 50
            }}
            whileInView={{
                opacity: 1,
                y: 1,
                transition: {
                    type: "spring",
                    damping: 10,
                    mass: 0.75,
                    stiffness: 100,
                    duration: 1,
                    delay: 0.2 * index
                },
            }}
            whileHover={{
                scale: 0.95,
            }}
            viewport={{ once: true }}
        >
            <TbWorldWww size={32} />
        </Box>
    </Link>
);

export default Website;