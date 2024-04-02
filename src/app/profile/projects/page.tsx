"use server";
import { redirect } from 'next/navigation';
import { Container } from "@chakra-ui/react";
import ProfileProjects from '@/components/profile/projects.profile';
import getProjectItems from "@/actions/database/projects/getProjectItems";



export default async function Page() {

    const projectItems = await getProjectItems("pUpfSkG054JiE0FiwhtZ");
    if (!projectItems) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={0} overflow="hidden" minH="75vh" mb={10}>
            <ProfileProjects projectItems={projectItems} />
        </Container>
    );
}