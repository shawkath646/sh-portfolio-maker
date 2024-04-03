"use server";
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { auth } from '@/app/auth';
import { Container } from "@chakra-ui/react";
import ProfileProjects from '@/components/profile/projects.profile';
import getProjectItems from "@/actions/database/projects/getProjectItems";



export default async function Page() {

    const session = await auth() as Session;
    const projectItems = await getProjectItems(session.user.id as string);
    if (!projectItems) redirect("/profile/create-user");

    return (
        <Container as="main" maxW={1536} mx="auto" pt={20} px={0} overflow="hidden" minH="75vh" mb={10}>
            <ProfileProjects username={session.user.username as string} projectItems={projectItems} />
        </Container>
    );
}