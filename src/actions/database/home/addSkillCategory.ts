"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { ResponseType, SkillCategoryType } from "@/types/types";
import getHomeData from "./getHomeData";

const addSkillCategory = async(item: SkillCategoryType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    const homeData = await getHomeData(session.user.id);
    if (!homeData) return {
        status: "error",
        message: "Failed to fetch home data."
    };

    const oldCategories = homeData.intro.skillCategories;
    const filteredCategories = oldCategories.filter(prevItem => prevItem.categoryId !== item.categoryId);

    await db.collection("home").doc(session.user.id).set({ skillCategories: [ ...filteredCategories, item ] }, { merge: true });

    return {
        status: "success",
        message: 'Skill category added successfully.'
    };
};

export default addSkillCategory;