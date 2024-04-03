"use server";
import { redirect } from "next/navigation";
import PreferencesBox from "./PreferencesBox";
import getMetadataByUsername from "@/actions/database/metadata/getMetadataByUsername";
import getPreferencesData from "@/actions/database/preferences/getPreferencesData";
import addViewer from "@/actions/database/addViewer";

export default async function Page({ params }: { params: { slug: string } }) {

    const response = await getMetadataByUsername(params.slug);
    if (!response) redirect("/not-found");
    const userId = response.id;

    const preferencesData = await getPreferencesData(userId);
    if (!preferencesData) redirect("/not-found");

    await addViewer(userId);

    return <PreferencesBox username={params.slug} preferencesData={preferencesData} joinedOn={response.joinedOn as Date} profileViews={response.viewers} />;
}