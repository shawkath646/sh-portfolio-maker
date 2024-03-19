"use server";
import { redirect } from "next/navigation";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getProjectsData from "@/actions/database/projects/getProjectsData";
import ProjectsBox from "./ProjectsBox";


export default async function Page({ params }: { params: { slug: string } }) {
    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const portfolioData = await getProjectsData(userId);
    if (!portfolioData) redirect("/not-found");

    return <ProjectsBox projectsData={portfolioData} username={params.slug} />
}