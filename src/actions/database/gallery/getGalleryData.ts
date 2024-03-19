import { db } from "@/config/firebase.config";
import { CollectionType, GalleryDataType, GalleryItemType } from "@/types/types";
import { cache } from "react";

const getGalleryData = cache(async (userId: string) => {
    const collectionRef = await db.collection("gallery").doc(userId).get();
    if (!collectionRef.exists) return null;
    const { collection } = collectionRef.data() as { collection: CollectionType[] };
    const galleryItemsRef = await collectionRef.ref.collection("galleryItems").get();
    const galleryItems = galleryItemsRef.docs.map((doc) => doc.data() as GalleryItemType);

    return {
        collection,
        galleryItems
    } as GalleryDataType;
});

export default getGalleryData;