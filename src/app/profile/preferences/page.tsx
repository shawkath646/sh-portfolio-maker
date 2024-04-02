"use server";
import { redirect } from 'next/navigation';
import { Container } from "@chakra-ui/react";
import ProfilePersonalData from '@/components/profile/personalData.profile';
import ProfileEvent from '@/components/profile/event.profile';
import getPreferencesData from "@/actions/database/preferences/getPreferencesData";



export default async function Page() {

    const preferencesData = await getPreferencesData("pUpfSkG054JiE0FiwhtZ")
    if (!preferencesData) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={0} overflow="hidden" minH="75vh" mb={10}>
            <ProfilePersonalData personalData={preferencesData.personalData} />
            <ProfileEvent eventItems={preferencesData.eventItems} />
        </Container>
    );
}