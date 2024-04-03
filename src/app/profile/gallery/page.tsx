"use server";
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { auth } from '@/app/auth';
import { Container } from "@chakra-ui/react";
import ProfileGallery from '@/components/profile/gallery.profile';
import getGalleryData from "@/actions/database/gallery/getGalleryData";

export default async function Page() {

    const session = await auth() as Session;
    const galleryData = await getGalleryData(session.user.id as string);
    if (!galleryData) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={5} overflow="hidden" minH="75vh" mb={10}>
            <ProfileGallery galleryData={galleryData} />
        </Container>
    );
}