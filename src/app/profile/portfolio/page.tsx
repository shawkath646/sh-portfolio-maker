"use server";
import { redirect } from 'next/navigation';
import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { Container } from "@chakra-ui/react";
import ProfileEducation from '@/components/profile/education.profile';
import ProfileWorkExperience from '@/components/profile/workExperience.profile';
import ProfileVolunteering from '@/components/profile/volunteering.profile';
import ProfileReawardAndAchevement from '@/components/profile/reaward&achievement';
import getPortfolioData from "@/actions/database/portfolio/getPortfolioData";



export default async function Page() {

    const session = await auth() as Session;
    const portfolioData = await getPortfolioData(session.user.id as string);
    if (!portfolioData) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={0} overflow="hidden" minH="75vh" mb={10}>
            <ProfileEducation educationItems={portfolioData.educationItems} />
            <ProfileWorkExperience workExperienceItems={portfolioData.workExperienceItems} />
            <ProfileVolunteering volunteeringItems={portfolioData.volunteeringItems} />
            <ProfileReawardAndAchevement reawardAndAchievementItems={portfolioData.reawardAndAchievementItems} />
        </Container>
    );
}