import { cache } from "react";
import { db } from "@/config/firebase.config";
import { FeaturedItemType, HomeDataType, IntroType, MiniGalleryItemType, SkillItemType } from "@/types/types";


const getHomeData = cache(async(userId: string): Promise<HomeDataType | null> => {
    const introRef = await db.collection('home').doc(userId).get();
    if (!introRef.exists) return null;
    const intro = introRef.data() as IntroType;
    const featuredItemsSnapshot = await introRef.ref.collection("featuredItems").get();
    const featuredItems = featuredItemsSnapshot.docs.map((doc) => doc.data() as FeaturedItemType);
    const skillItemsSnapshot = await introRef.ref.collection("skillItems").get();
    const skillItems = skillItemsSnapshot.docs.map((doc) => doc.data() as SkillItemType);
    const miniGallerySnapshot = await introRef.ref.collection("miniGalleryItems").get();
    const miniGalleryItems = miniGallerySnapshot.docs.map((doc) => doc.data() as MiniGalleryItemType);

    return {
        intro,
        featuredItems,
        skillItems,
        miniGalleryItems,
    }
})

export default getHomeData;
