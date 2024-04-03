"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import deleteImageByFileName from "@/actions/database/deleteFileByName";
import { ResponseType } from "@/types/types";

const removeFeaturedItem = async(itemId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };
    await deleteImageByFileName(`featuredItem-${itemId}`);

    await db.collection("home").doc(session.user.id).collection("featuredItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Featured item deleted successfully.'
    };
};

export default removeFeaturedItem;