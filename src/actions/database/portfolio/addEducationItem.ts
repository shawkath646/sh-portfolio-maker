"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { EducationItemType, ResponseType } from "@/types/types";

const addEducationItem = async(item: EducationItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("portfolio").doc(session.user.id).collection("educationItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Education item updated successfully.'
    };
};

export default addEducationItem;