"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import getHomeData from "./getHomeData";

const removeSkillCategory = async(categoryId: string) => {
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
    const skillCategories = oldCategories.filter(prevItem => prevItem.categoryId !== categoryId);

    await db.collection("home").doc(session.user.id).set({ skillCategories }, { merge: true });

    return {
        status: "success",
        message: 'Skill category deleted successfully.'
    };
};

export default removeSkillCategory;