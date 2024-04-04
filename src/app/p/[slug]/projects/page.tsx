"use server";
import { redirect } from "next/navigation";
import ProjectsBox from "./ProjectsBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getProjectsData from "@/actions/database/projects/getProjectItems";
import addViewer from "@/actions/database/addViewer";


export default async function Page({ params }: { params: { slug: string } }) {
    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const projectsData = await getProjectsData(userId);
    if (!projectsData) redirect("/not-found");

    await addViewer(userId);

    return <ProjectsBox projectsData={projectsData} username={params.slug} />
}