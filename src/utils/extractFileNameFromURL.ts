"use server";

export default async function extractFileNameFromURL(downloadUrl: string) {
    const urlParts = downloadUrl.split("/");
    const fileNameWithParams = urlParts[urlParts.length - 1];
    const fileNameParts = fileNameWithParams.split("?");
    const fileName = fileNameParts[0];
    return fileName;
}