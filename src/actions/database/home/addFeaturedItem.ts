"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { FeaturedItemType, ResponseType } from "@/types/types";


const updateFeaturedItem = async(item: FeaturedItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    if (item.icon) {
        const { downloadURL } = await uploadFile(item.icon, `featuredItem-${item.id}`);
        item.icon = downloadURL;
    }

    await db.collection("home").doc(session.user.id).collection("featuredItems").doc(item.id).set(item);
    return {
        status: "success",
        message: 'Featured item updated successfully.'
    };
};

export default updateFeaturedItem;