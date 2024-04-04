"use client";
import { motion } from "framer-motion";
import { Box, Text, Heading, Stack, Avatar, Button, Flex, SimpleGrid, GridItem, Tag, TagLeftIcon, TagLabel, useMediaQuery } from "@chakra-ui/react";
import { Link } from '@chakra-ui/next-js';
import { IntroType } from '@/types/types';
import { IoMdInformationCircle } from "react-icons/io";
import Contacts from "./Contacts";

const Intro = ({ introData }: { introData: IntroType }) => {

    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    return (
        <Stack direction={["column", "column", "column", "column", "row"]} justifyContent="space-between" rowGap={10}>
            <Box as="section" maxW="800px">
                <Text
                    as={motion.p}
                    fontSize={["xl", "xl", "2xl"]}
                    fontWeight={500} color="blueviolet"
                    mb={5}
                    initial={{
                        opacity: 0,
                        x: 50
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1,
                        },
                    }}
                    viewport={{ once: true }}
                >
                    Hi! 👋 I am
                </Text>
                <Flex alignItems={["center", "center", "unset"]}>
                    <Avatar
                        as={motion.div}
                        name={introData.fullName}
                        src={introData.introPic}
                        size="lg"
                        height="80px"
                        width="80px"
                        initial={{
                            opacity: 0,
                            y: -50
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 1,
                            }
                        }}
                        viewport={{ once: true }}
                    />
                    <Box ml={4}>
                        <Heading textTransform="uppercase">
                            {introData.fullName.split("").map((el, i) => (
                                <motion.span
                                    key={i}
                                    initial={{
                                        opacity: 0
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5,
                                            delay: i / 8
                                        }
                                    }}
                                    viewport={{ once: true }}
                                >
                                    {el}
                                </motion.span>
                            ))}
                        </Heading>
                        {isLargerThan768 && (
                            <Flex mt={2} wrap="wrap" columnGap={1.5}>
                                {introData.title.map((item, index) => (
                                    <Text
                                        as={motion.p}
                                        color="#6b7280"
                                        fontWeight={500}
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            x: 50
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                            transition: {
                                                duration: 1,
                                                delay: index * 0.2
                                            }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        {index > 0 ? "| " : ""}{item}
                                    </Text>
                                ))}
                            </Flex>
                        )}
                    </Box>
                </Flex>
                {!isLargerThan768 && (
                    <Flex mt={4} wrap="wrap" columnGap={1.5}>
                        {introData.title.map((item, index) => (
                            <Text
                                as={motion.p}
                                color="#6b7280"
                                fontWeight={500}
                                key={index}
                                initial={{
                                    opacity: 0,
                                    x: 50
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 1,
                                        delay: index * 0.2
                                    }
                                }}
                                viewport={{ once: true }}
                            >
                                {index > 0 ? "| " : ""}{item}
                            </Text>
                        ))}
                    </Flex>
                )}
                <SimpleGrid columns={[1, 1, 1, 2]} maxW="1000px">
                    {introData.description && (
                        <GridItem
                            as={motion.div}
                            initial={{
                                opacity: 0,
                                x: -100
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 1,
                                }
                            }}
                            viewport={{ once: true }}
                        >
                            <Tag fontWeight={500} size="lg" variant="subtle" colorScheme="purple" mt={10}>
                                <TagLeftIcon as={IoMdInformationCircle} />
                                <TagLabel>Profile Description</TagLabel>
                            </Tag>
                            <Text color="#4b5563" mt={4} fontWeight={500}>{introData.description}</Text>
                        </GridItem>
                    )}

                    <Stack spacing={5} direction="row" mt={10} maxW={450} flexWrap="wrap" justifyContent="center">
                        <Button
                            as={motion.button}
                            colorScheme="blue"
                            isDisabled
                            rounded={20}
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                                transition: {
                                    duration: 1,
                                    delay: 1
                                }
                            }}
                            viewport={{ once: true }}
                        >
                            Download CV
                        </Button>
                        {introData.quickLinks.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                            >
                                <Button
                                    as={motion.div}
                                    colorScheme={item.color}
                                    rounded={20}
                                    initial={{
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        transition: {
                                            duration: 1,
                                            delay: (index + 1) * 0.2 + 1
                                        }
                                    }}
                                    viewport={{ once: true }}
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </Stack>
                </SimpleGrid>
            </Box>
            {introData.socialItems.length > 0 && (
                <Contacts socialItems={introData.socialItems} />
            )}
        </Stack>
    )
};
export default Intro;