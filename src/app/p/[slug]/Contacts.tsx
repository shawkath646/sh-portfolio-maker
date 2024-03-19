"use client";
import { motion } from "framer-motion";
import { Flex, Center, Text, Box } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Facebook from "@/components/contactItems/Facebook";
import Messenger from "@/components/contactItems/Messenger";
import Telegram from "@/components/contactItems/Telegram";
import GitHub from "@/components/contactItems/GitHub";
import LinkedIn from "@/components/contactItems/LinkedIn";
import Whatsapp from "@/components/contactItems/Whatsapp";
import Website from "@/components/contactItems/Website";
import Youtube from "@/components/contactItems/Youtube";
import Instagram from "@/components/contactItems/Instagram";
import { SiGmail } from "react-icons/si";




const Contacts = ({ socialItems }: { socialItems: string[] }) => {

    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    const email = socialItems.find(item => emailRegex.test(item));

    return (
        <Flex as="section" minW="350px" wrap="wrap" mt={5}>
            {email && (
                <Center w="full">
                    <Link
                        href={"mailto:" + email}
                        target="_blank"
                        _hover={{
                            textDecoration: "none",
                        }}
                    >
                        <Box
                            as={motion.div}
                            fontSize="20px"
                            rounded="full"
                            display="flex"
                            alignItems="center"
                            boxShadow="2xl"
                            bg="#e2e8f0"
                            py={3}
                            px={4}
                            fontWeight={500}
                            initial={{
                                opacity: 0,
                                width: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                                width: "100%",
                                transition: {
                                    duration: 1,
                                }
                            }}
                            whileHover={{
                                scale: 0.95,
                            }}
                            viewport={{ once: true }}
                            overflow="hidden"
                        >
                            <SiGmail size={24} />
                            <Text ml={3}>{email}</Text>
                        </Box>
                    </Link>
                </Center>
            )}

            <Flex mt={10} wrap="wrap" gap={5} justifyContent="center" alignItems="center" w="full">
                {socialItems.sort().map((item, index) => {
                    if (urlRegex.test(item)) {
                        if (item.includes("facebook.com")) return <Facebook key={item} index={index} href={item} />
                        else if (item.includes("m.me")) return <Messenger key={item} index={index} href={item} />
                        else if (item.includes("wa.me")) return <Whatsapp key={item} index={index} href={item} />
                        else if (item.includes("linkedin.com")) return <LinkedIn key={item} index={index} href={item} />
                        else if (item.includes("github.com")) return <GitHub key={item} index={index} href={item} />
                        else if (item.includes("t.me")) return <Telegram key={item} index={index} href={item} />
                        else if (item.includes("youtube.com")) return <Youtube key={item} index={index} href={item} />
                        else if (item.includes("instagram.com")) return <Instagram key={item} index={index} href={item} />
                        else return <Website key={item} index={index} href={item} />
                    }
                })}
            </Flex>

        </Flex>
    )
};

export default Contacts;