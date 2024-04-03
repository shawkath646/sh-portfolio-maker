"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType, GalleryCollectionType } from "@/types/types";

const removeGalleryCollection = async (collectionId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    const collectionRef = db.collection("gallery").doc(session.user.id);
    const oldCollection = await collectionRef.get();

    const { collection: oldCollectionData } = oldCollection.data() as { collection: GalleryCollectionType[] };
    const filteredCollectionData = oldCollectionData.filter(prevItem => prevItem.collectionId !== collectionId);
    await collectionRef.set({ collection: filteredCollectionData });

    return {
        status: "success",
        message: 'Collection deleted successfully.'
    };
};

export default removeGalleryCollection;