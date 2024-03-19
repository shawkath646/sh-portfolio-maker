"use server";
import { db } from "@/config/firebase.config";
import uploadImage from "@/actions/database/uploadImage";
import { IntroType, ResponseType } from "@/types/types";


export async function updateIntroData(userId: string, introData: IntroType, selectedImage?: string): Promise<ResponseType> {

    if (selectedImage) {
        const { downloadURL } = await uploadImage(selectedImage, `intro-main-${userId}`, introData.introPic);
        introData.introPic = downloadURL;
    }

    await db.collection('intro').doc(userId).set(introData);

    return {
        status: "success",
        message: 'Intro data updated successfully'
    };
}