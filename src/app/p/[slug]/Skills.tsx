"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flex, Center, GridItem, Heading, SimpleGrid, Stack, Text, Box, } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { SkillsCategoryType, SkillItemType } from "@/types/types";
import { IoIosArrowForward } from "react-icons/io";
import { MdWorkspaces } from "react-icons/md";



const Skills = ({ skillsItem, categories }: { skillsItem: SkillItemType[]; categories: SkillsCategoryType[] }) => (
    <Box as="section" pt={10}>
        <Heading
            as={motion.h3}
            size={['xl', 'xl', 'lg']}
            textAlign="center"
            initial={{
                opacity: 0
            }}
            whileInView={{
                opacity: 1,
                transition: {
                    duration: 1
                }
            }}
            viewport={{ once: true }}
        >
            Experienced with
        </Heading>
        <SimpleGrid mt={5} minChildWidth={300} spacing={2}>
            {categories?.map((category, index) => (
                <GridItem
                    as={motion.div}
                    key={index}
                    display={["block", "block", "flex"]}
                    initial={{
                        opacity: 0,
                        x: -50
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <Flex w="320px" alignItems="center" gap={2}>
                        <Text
                            fontSize="24px"
                            variant='solid'
                            colorScheme='blue'
                        >
                            {category.name}
                        </Text>
                        <IoIosArrowForward size={26} />
                    </Flex>
                    <SimpleGrid minChildWidth="150px" spacing={4} mt={3} justifyItems="center" w="full">
                        {skillsItem.filter(item => item.categoryId === category.categoryId).map((item, index) => (
                            <GridItem
                                as={motion.div}
                                key={index}
                                alignItems="center"
                                initial={{
                                    opacity: 0,
                                    x: 50,
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
                                <Flex alignItems="center" gap={4}>
                                    {item.icon ? (
                                        <Image src={item.icon} alt={`${item.name} icon`} height={42} width={42} />
                                    ) : (
                                        <MdWorkspaces size={24} style={{ color: "#0ea5e9" }} />
                                    )}
                                    <Text fontSize="24px" fontWeight={500}>{item.name}</Text>
                                </Flex>
                            </GridItem>
                        ))}
                    </SimpleGrid>
                </GridItem>
            ))}
        </SimpleGrid>
        <Center mt={5}>
            <Link
                href="/projects"
                _hover={{ textDecoration: "none" }}
            >
                <Stack
                    as={motion.div}
                    direction="row"
                    alignItems="center"
                    py={4}
                    color="#3b82f6"
                    _hover={{
                        color: "#2563eb", transition: "all 0.3s ease"
                    }}
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 1
                        }
                    }}
                    viewport={{ once: true }}
                >
                    <Text textAlign="center">View skills related projects</Text>
                    <IoIosArrowForward size={20} />
                </Stack>
            </Link>
        </Center>
    </Box>
);

export default Skills;