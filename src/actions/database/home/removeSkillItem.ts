"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import deleteFileByName from "../deleteFileByName";
import { ResponseType } from "@/types/types";

const removeSkillItem = async(itemId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await deleteFileByName(`skillItem-${itemId}`);
    await db.collection("home").doc(session.user.id).collection("skillItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Skill item deleted successfully.'
    };
};

export default removeSkillItem;