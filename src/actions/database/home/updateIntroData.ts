"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadImage from "@/actions/database/uploadImage";
import { PartialBy, IntroType, ResponseType } from "@/types/types";



export async function updateIntroData(introData: PartialBy<IntroType, "skillsCategories">): Promise<ResponseType> {

    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    if (introData.introPic) {
        const { downloadURL } = await uploadImage(introData.introPic, `intro-${session.user.id}`);
        introData.introPic = downloadURL;
    }

    await db.collection('home').doc(session.user.id).set(introData, { merge: true });

    return {
        status: "success",
        message: 'Intro data updated successfully'
    };
}