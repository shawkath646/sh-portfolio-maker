"use client";
import { Container, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import Volunteering from "./Volunteering";
import Reawards from "./Reawards";
import { PortfolioDataType } from "@/types/types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export default function PortfolioBox({ portfolioData, username }: { portfolioData: PortfolioDataType, username: string }) {
    return (
        <Box
            as="main"
            w="full"
            bgColor="#f1f5f9"
        >
            <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
                {portfolioData.education && (
                    <Education educationData={portfolioData.education} />
                )}
                {portfolioData.workExperience && (
                    <WorkExperience workExperienceData={portfolioData.workExperience} />
                )}
                {portfolioData.volunteering && (
                    <Volunteering volunteeringData={portfolioData.volunteering} />
                )}
                {portfolioData.reawards && (
                    <Reawards reawardsData={portfolioData.reawards} />
                )}
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                    mb={5}
                >
                    <Link
                        href={`/p/${username}`}
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        color="#0891b2"
                        _hover={{
                            textDecoration: "none",
                            color: "#0e7490",
                            transition: "color 0.3s ease"
                        }}
                        fontWeight={500}
                    >
                        <IoIosArrowBack size={20} />
                        <Text>Prev: Home</Text>
                    </Link>
                    <Link
                        href={`/p/${username}/projects`}
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                        color="#0891b2"
                        _hover={{
                            textDecoration: "none",
                            color: "#0e7490",
                            transition: "color 0.3s ease"
                        }}
                        fontWeight={500}
                        mt={3}
                        mb={5}
                    >
                        <Text>Next: Projects</Text>
                        <IoIosArrowForward size={20} />
                    </Link>
                </Flex>
            </Container>
        </Box>
    );
}