"use server";
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { auth } from '@/app/auth';
import { Container } from "@chakra-ui/react";
import ProfilePersonalData from '@/components/profile/personalData.profile';
import ProfileEvent from '@/components/profile/event.profile';
import ProfileExtra from '@/components/profile/extra.profile';
import getPreferencesData from "@/actions/database/preferences/getPreferencesData";
import getMetadataById from '@/actions/database/metadata/getMetadataById';
import getViewers from '@/actions/database/metadata/getViewers';



export default async function Page() {

    const session = await auth() as Session;
    const preferencesData = await getPreferencesData(session.user.id as string);
    const metaData = await getMetadataById(session.user.id as string);
    const viewerItems = await getViewers();

    if (!preferencesData || !metaData) redirect("/profile/create-user");



    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={5} overflow="hidden" minH="75vh" mb={10}>
            <ProfilePersonalData personalData={preferencesData.personalData} />
            <ProfileEvent eventItems={preferencesData.eventItems} />
            <ProfileExtra metaData={metaData} viewerItems={viewerItems} />
        </Container>
    );
}