"use server";
import type { Metadata } from 'next';
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { auth } from "@/app/auth";
import { Container } from "@chakra-ui/react";
import ProfileIntro from '@/components/profile/intro.profile';
import ProfileFeatured from '@/components/profile/featured.profile';
import ProfileSkills from '@/components/profile/skills.profile';
import ProfileMiniGallery from '@/components/profile/miniGallery.profile';
import getHomeData from "@/actions/database/home/getHomeData";

export async function metadata(): Promise<Metadata> {
    return {
        title: "Profile - SH Portfolio Maker"
    }
};

export default async function Page() {

    const session = await auth() as Session;
    const homeData = await getHomeData(session.user.id as string);
    if (!homeData) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={5} overflow="hidden" minH="75vh" mb={10}>
            <ProfileIntro introData={homeData.intro} />
            <ProfileFeatured featuredItems={homeData.featuredItems} />
            <ProfileSkills skillItems={homeData.skillItems} skillCategories={homeData.intro.skillCategories} />
            <ProfileMiniGallery miniGalleryItems={homeData.miniGalleryItems} />
        </Container>
    );
}