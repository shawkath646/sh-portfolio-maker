"use server";
import { redirect } from "next/navigation";
import GalleryBox from "./GalleryBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getGalleryData from "@/actions/database/gallery/getGalleryData";
import addViewer from "@/actions/database/addViewer";



export default async function Page({ params }: { params: { slug: string } }) {
    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const galleryData = await getGalleryData(userId);
    if (!galleryData) redirect("/not-found");

    await addViewer(userId);

    return <GalleryBox username={params.slug} galleryData={galleryData} />
}