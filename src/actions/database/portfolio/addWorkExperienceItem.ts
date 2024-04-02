"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType, WorkExperienceItemType } from "@/types/types";

const addWorkExperienceItem = async(item: WorkExperienceItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("portfolio").doc(session.user.id).collection("workExperienceItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Work experience item updated successfully.'
    };
};

export default addWorkExperienceItem;