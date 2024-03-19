"use server";
import { bucket } from "@/config/firebase.config";
import extractFileNameFromURL from "@/utils/extractFileNameFromURL";

export default async function deleteImageByURL(imageURL: string) {
    const fileName = await extractFileNameFromURL(imageURL);
    const file = bucket.file(fileName);
    const isImageExist = await file.exists();
    if (isImageExist[0]) {
        await file.delete();
    }
}