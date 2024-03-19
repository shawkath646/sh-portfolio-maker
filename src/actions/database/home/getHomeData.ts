import { cache } from "react";
import { db } from "@/config/firebase.config";
import { FeaturedItemsType, HomeDataType, IntroType, SkillItemsType } from "@/types/types";


const getHomeData = cache(async(userId: string): Promise<HomeDataType | null> => {
    const introRef = await db.collection('home').doc(userId).get();
    if (!introRef.exists) return null;
    const intro = introRef.data() as IntroType;
    const featuredItemsRef = await introRef.ref.collection("featuredItems").get();
    const featuredItems = featuredItemsRef.docs.map((doc) => doc.data() as FeaturedItemsType);
    const skillItemsRef = await introRef.ref.collection("skillItems").get();
    const skillItems = skillItemsRef.docs.map((doc) => doc.data() as SkillItemsType);
    return {
        intro,
        featuredItems,
        skillItems
    }
})

export default getHomeData;
