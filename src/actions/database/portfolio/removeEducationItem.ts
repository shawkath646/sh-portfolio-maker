"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType } from "@/types/types";

const removeEducationItem = async(itemId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("portfolio").doc(session.user.id).collection("educationItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Education item deleted successfully.'
    };
};

export default removeEducationItem;