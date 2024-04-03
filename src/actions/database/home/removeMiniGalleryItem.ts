"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import deleteImageByFileName from "@/actions/database/deleteFileByName";

const removeMiniGalleryItem = async(itemId: string) => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await deleteImageByFileName(`miniGalleryItem-${itemId}`);

    await db.collection("home").doc(session.user.id).collection("miniGalleryItems").doc(itemId).delete();
    return {
        status: "success",
        message: 'Featured item deleted successfully.'
    };
};

export default removeMiniGalleryItem;