"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { GalleryItemType, ResponseType } from "@/types/types";


const addGalleryItem = async (item: GalleryItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    const { downloadURL } = await uploadFile(item.src, `galleryItem-${item.id}`);
    item.src = downloadURL;

    await db.collection("gallery").doc(session.user.id).collection("galleryItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Gallery item added successfully.'
    };
};

export default addGalleryItem;