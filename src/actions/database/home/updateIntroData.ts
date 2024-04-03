"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { PartialBy, IntroType, ResponseType } from "@/types/types";

export async function updateIntroData(introData: PartialBy<IntroType, "skillCategories">): Promise<ResponseType> {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    if (introData.introPic) {
        const { downloadURL } = await uploadFile(introData.introPic, `intro-${session.user.id}`);
        introData.introPic = downloadURL;
    }

    await db.collection('home').doc(session.user.id).set(introData, { merge: true });

    return {
        status: "success",
        message: 'Intro data updated successfully'
    };
}