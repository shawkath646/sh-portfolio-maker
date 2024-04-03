"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadFile from "../uploadFile";
import { ResponseType, SkillItemType } from "@/types/types";


const addSkillItem = async(item: SkillItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    if (item.icon) {
        const { downloadURL } = await uploadFile(item.icon, `skillItem-${item.id}`);
        item.icon = downloadURL;
    };

    await db.collection("home").doc(session.user.id).collection("skillItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Skill item added successfully.'
    };
};

export default addSkillItem;