"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadImage from "../uploadImage";
import { MiniGalleryItemType, ResponseType } from "@/types/types";

const addMiniGalleryItem = async (item: MiniGalleryItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    const { downloadURL } = await uploadImage(item.src, `miniGalleryItem-${item.id}`);
    item.src = downloadURL;

    await db.collection("home").doc(session.user.id).collection("miniGalleryItems").doc(item.id).set(item);
    return {
        status: "success",
        message: 'Featured item added successfully.'
    };
};

export default addMiniGalleryItem;