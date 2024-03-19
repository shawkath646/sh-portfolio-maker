"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flex, Center, GridItem, Heading, SimpleGrid, Stack, Text, Box, } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { SkillsCategoriesType, SkillItemsType } from "@/types/types";
import { IoIosArrowForward } from "react-icons/io";
import { MdWorkspaces } from "react-icons/md";



const Skills = ({ skillsItem, categories }: { skillsItem: SkillItemsType[]; categories: SkillsCategoriesType[] }) => (
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
                                        <Image src="https://storage.googleapis.com/sh-portfolio-97faf.appspot.com/nticgqyaS34Wl4NlIhEB?GoogleAccessId=firebase-adminsdk-w6h90%40sh-portfolio-97faf.iam.gserviceaccount.com&Expires=2016880165&Signature=EwLx0B7vl7JNd5j3pnCgfySqr%2FISMAmxhmGcvRPCRua0aPcnWGpsKfmcH%2FUi78WdE7rNvHTnQIIvtE6qYbvLADzAQjrIbdr0CaQuigd6VhTpjck89YPtvZ88DZMIyYTVBn3OvYmvENTiaXf6DeoJ5JJY1YAUDW%2FDWpNC%2FD%2FqnY5Y2m013U%2FFkg8PbgnXdhQpDG3XiXQsHlb0qoACFQLx41zQbKZucrorkY0U9k3g%2BA%2FDk%2F3DFHuOmrqJ9kOJLPLRetETpMcaJg%2Fkoxs1%2FnmcX8UBiFBGUL0xCUZT%2Bgx0Cr5EukxVcrEjj2idgSAU%2FPaIAfYvIGkZxq%2B4cKJP9x6xiw%3D%3D" alt={`${item.name} icon`} height={42} width={42} />
                                    ) : (
                                        <Box color="#0ea5e9">
                                            <MdWorkspaces size={24} />
                                        </Box>
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