"use server";
import { redirect } from "next/navigation";
import GalleryBox from "./GalleryBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getGalleryData from "@/actions/database/gallery/getGalleryData";



export default async function Page({ params }: { params: { slug: string } }) {
    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const galleryData = await getGalleryData(userId);
    if (!galleryData) redirect("/not-found");

    return <GalleryBox username={params.slug} galleryData={galleryData} />
}