"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { PersonalDataType, ResponseType } from "@/types/types";

const addPersonalData = async (personalData: PersonalDataType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    await db.collection("preferences").doc(session.user.id).set(personalData);

    return {
        status: "success",
        message: 'Personal data updated successfully.'
    };
};

export default addPersonalData;