"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType, VolunteeringItemType } from "@/types/types";

const addVolunteeringItem = async(item: VolunteeringItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("portfolio").doc(session.user.id).collection("volunteeringItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Volunteering item updated successfully.'
    };
};

export default addVolunteeringItem;