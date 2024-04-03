"use client";
import { Container, Box, Flex, Text, Center } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import Education from "./Education";
import WorkExperience from "./WorkExperience";
import Volunteering from "./Volunteering";
import ReawardAndAchievement from "./ReawardAndAchievement";
import { PortfolioDataType } from "@/types/types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoWarning } from "react-icons/io5";


const PortfolioBox = ({ portfolioData, username }: { portfolioData: PortfolioDataType, username: string }) => (
    <Box
        as="main"
        w="full"
        bgColor="#f1f5f9"
    >
        <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
            {portfolioData.educationItems.length > 0 && (
                <Education educationData={portfolioData.educationItems} />
            )}
            {portfolioData.workExperienceItems.length > 0 && (
                <WorkExperience workExperienceData={portfolioData.workExperienceItems} />
            )}
            {portfolioData.volunteeringItems.length > 0 && (
                <Volunteering volunteeringData={portfolioData.volunteeringItems} />
            )}
            {portfolioData.reawardAndAchievementItems.length > 0 && (
                <ReawardAndAchievement reawardAndAchievementItems={portfolioData.reawardAndAchievementItems} />
            )}
            {(!portfolioData.educationItems.length
                && !portfolioData.workExperienceItems.length
                && !portfolioData.volunteeringItems.length
                && !portfolioData.reawardAndAchievementItems.length
            )
                && (
                    <Box as={Center} minH="60vh" gap={3}>
                        <IoWarning size={26} />
                        <Text fontSize="24px">No portfolio item found.</Text>
                    </Box>
                )}
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mt={8}
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
                >
                    <Text>Next: Projects</Text>
                    <IoIosArrowForward size={20} />
                </Link>
            </Flex>
        </Container>
    </Box>
);

export default PortfolioBox;