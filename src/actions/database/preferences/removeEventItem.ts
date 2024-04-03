"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";

const removeEventItem = async (itemId: string) => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("preferences").doc(session.user.id).collection("eventItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Event item deleted successfully.'
    };
};

export default removeEventItem;