"use server";
import { redirect } from "next/navigation";
import ProjectItemBox from "./ProjectItemBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getProjectDataById from "@/actions/database/projects/getProjectDataById";

export default async function Page({ params }: { params: { slug: string, projectId: string } }) {

    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const projectsData = await getProjectDataById(userId, params.projectId);
    if (!projectsData) redirect("/not-found");

    return <ProjectItemBox projectsData={projectsData} />
}