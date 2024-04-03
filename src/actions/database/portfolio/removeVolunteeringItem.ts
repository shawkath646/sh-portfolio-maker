"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType } from "@/types/types";

const removeVolunteeringItem = async(itemId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("portfolio").doc(session.user.id).collection("volunteeringItems").doc(itemId).delete();

    return {
        status: "success",
        message: 'Volunteering item deleted successfully.'
    };
};

export default removeVolunteeringItem;