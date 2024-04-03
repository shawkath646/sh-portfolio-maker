"use server";
import { redirect } from "next/navigation";
import PortfolioBox from "./PortfolioBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getPortfolioData from "@/actions/database/portfolio/getPortfolioData";
import addViewer from "@/actions/database/addViewer";


export default async function Page({ params }: { params: { slug: string } }) {
    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const portfolioData = await getPortfolioData(userId);
    if (!portfolioData) redirect("/not-found");

    await addViewer(userId);

    return <PortfolioBox portfolioData={portfolioData} username={params.slug} />
}