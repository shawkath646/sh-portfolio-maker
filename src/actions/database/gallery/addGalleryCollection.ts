"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { GalleryCollectionType, ResponseType } from "@/types/types";

const addGalleryCollection = async(collection: GalleryCollectionType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    const collectionRef = db.collection("gallery").doc(session.user.id);
    const oldCollection = await collectionRef.get();

    const { collection: oldCollectionData } = oldCollection.data() as { collection: GalleryCollectionType[] };
    const filteredCollectionData = oldCollectionData.filter(prevItem => prevItem.collectionId !== collection.collectionId);
    const newCollectionData: GalleryCollectionType[] = [...filteredCollectionData, collection];
    await collectionRef.set({ collection: newCollectionData });

    return {
        status: "success",
        message: 'Collection added successfully.'
    };
};

export default addGalleryCollection;