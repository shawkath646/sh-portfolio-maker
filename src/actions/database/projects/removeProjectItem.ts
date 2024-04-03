"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import deleteImageByFileName from "@/actions/database/deleteFileByName";
import { ResponseType } from "@/types/types";

const removeProjectItem = async(itemId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await deleteImageByFileName(`projectItem-icon-${itemId}`);
    await deleteImageByFileName(`projectItem-coverImage-${itemId}`);
    await deleteImageByFileName(`projectItem-description-${itemId}`);

    await db.collection("projects").doc(session.user.id).collection("projectItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Project item deleted successfully.'
    };
};

export default removeProjectItem;