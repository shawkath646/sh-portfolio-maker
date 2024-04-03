"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import deleteFileByName from "@/actions/database/deleteFileByName";
import { ResponseType } from "@/types/types";

const removeGalleryItem = async (itemId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await deleteFileByName(`galleryItem-${itemId}`);
    await db.collection("gallery").doc(session.user.id).collection("galleryItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Gallery item deleted successfully.'
    };
};

export default removeGalleryItem;