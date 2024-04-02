"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType, ReawardAndAchievementItemType } from "@/types/types";

const addReawardAndAchievementItem = async(item: ReawardAndAchievementItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("portfolio").doc(session.user.id).collection("reawardAndAchievementItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Reaward and achievement item updated successfully.'
    };
};

export default addReawardAndAchievementItem;