"use server";
import { redirect } from "next/navigation";
import PreferencesBox from "./PreferencesBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getPreferencesData from "@/actions/database/preferences/getPreferencesData";

export default async function Page({ params }: { params: { slug: string } }) {

    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const preferencesData = await getPreferencesData(userId);
    if (!preferencesData) redirect("/not-found");

    return <PreferencesBox username={params.slug} preferencesData={preferencesData} />;
}