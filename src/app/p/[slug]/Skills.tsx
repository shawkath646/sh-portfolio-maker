"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Flex,
    Center,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { SkillCategoryType, SkillItemType } from "@/types/types";
import { IoIosArrowForward } from "react-icons/io";
import { MdWorkspaces } from "react-icons/md";



const Skills = ({ skillsItem, categories }: { skillsItem: SkillItemType[]; categories: SkillCategoryType[] }) => (
    <Box as="section" pt={10}>
        <Heading
            as={motion.h3}
            size={['xl', 'xl', 'lg']}
            textAlign="center"
            mb={12}
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
        {categories?.map((category, index) => (
            <Box
                as={motion.div}
                key={index}
                mb={8}
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
                <Flex alignItems="center" gap={2}>
                    <Text
                        fontSize="24px"
                        variant='solid'
                        colorScheme='blue'
                        isTruncated
                    >
                        {category.name}
                    </Text>
                    <IoIosArrowForward size={26} />
                </Flex>
                <Flex flexWrap="wrap" gap={4} mt={3} justifyItems="center" w="full">
                    {(() => {
                        const filteredItems = skillsItem.filter(item => item.categoryId === category.categoryId);
                        return filteredItems.length > 0 ? filteredItems.map((item, index) => (
                            <Flex
                                as={motion.div}
                                key={index}
                                alignItems="center"
                                gap={4}
                                w="180px"
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
                                {item.icon ? (
                                    <Image src={item.icon} alt={`${item.name} icon`} height={42} width={42} style={{ objectFit: "cover", height: "42px", width: "42px" }} />
                                ) : (
                                    <Box width="35px" height="35px" flex="none">
                                        <MdWorkspaces size={24} style={{ color: "#0ea5e9", height: "35px", width: "35px" }} />
                                    </Box>
                                )}
                                <Popover>
                                    <PopoverTrigger>
                                        <Text fontSize="20px" fontWeight={500} isTruncated>{item.name}</Text>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Skill Name</PopoverHeader>
                                        <PopoverBody>{item.name}</PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        )) : (
                            <Text color="#475569">No item added</Text>
                        );
                    })()}
                </Flex>
            </Box>
        ))}
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