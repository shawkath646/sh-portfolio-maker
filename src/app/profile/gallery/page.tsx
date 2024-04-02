"use server";
import { redirect } from 'next/navigation';
import { Container } from "@chakra-ui/react";
import ProfileGallery from '@/components/profile/gallery.profile';
import getGalleryData from "@/actions/database/gallery/getGalleryData";

export default async function Page() {

    const galleryData = await getGalleryData("pUpfSkG054JiE0FiwhtZ");
    if (!galleryData) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={5} overflow="hidden" minH="75vh" mb={10}>
            <ProfileGallery galleryData={galleryData} />
        </Container>
    );
}