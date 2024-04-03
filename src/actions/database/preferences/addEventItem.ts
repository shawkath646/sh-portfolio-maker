"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { EventItemType, ResponseType } from "@/types/types";

const addEventItem = async (item: EventItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("preferences").doc(session.user.id).collection("eventItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Event item added successfully.'
    };
};

export default addEventItem;