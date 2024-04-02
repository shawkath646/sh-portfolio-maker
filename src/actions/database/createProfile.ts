"use server";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import introObject from "@/schema/intro.object";
import metadataObject from "@/schema/metadata.object";
import personalDataObject from "@/schema/personalData.object";
import { ResponseType } from "@/types/types";



const createProfile = async(): Promise<ResponseType> => {

    const session = await auth();

    if (!session || !session.user.id || !session.user.email || !session.user.firstName || !session.user.lastName) return {
        status: "error",
        message: "User daata invalid"
    };

    const appId = process.env.SHAS_APP_ID;
    const appSecret = process.env.SHAS_APP_SECRET;

    const apiURL = `https://sh-authentication-system.vercel.app/api/get-user-address?user_id=${session.user.id}`;
    const authHeader = 'Basic ' + Buffer.from(appId + ':' + appSecret).toString('base64');

    const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': authHeader
        }
    });

    const fetchedUserData = await response.json();
    if (fetchedUserData.status === "success" && fetchedUserData.data) {
        const presentAddress = fetchedUserData.data.present;
        const permanentAddress = fetchedUserData.data.permanent;
    
        const addComma = (value: string, isLast?: boolean) => value ? `${value}${!isLast ? ', ' : ''}` : '';
        const addHyphen = (value: string) => value ? ` - ${value}` : '';
    
        personalDataObject.presentAddress.line1 = `${addComma(presentAddress.street)}${addComma(presentAddress.city)}${addHyphen(presentAddress.postalCode)}`;
        personalDataObject.presentAddress.line2 = `${addComma(presentAddress.state)}${addComma(presentAddress.country, true)}`;
        personalDataObject.permanentAddress.line1 = `${addComma(permanentAddress.street)}${addComma(presentAddress.city)}${addHyphen(presentAddress.postalCode)}`;
        personalDataObject.permanentAddress.line2 = `${addComma(permanentAddress.state)}${addComma(presentAddress.country, true)}`;
    }
    


    introObject.fullName = session.user.firstName + " " + session.user.lastName;
    introObject.introPic = session.user.image || "";

    metadataObject.firstName = session.user.firstName;
    metadataObject.lastName = session.user.lastName;
    metadataObject.contact = session.user.email;
    metadataObject.id = session.user.id;
    metadataObject.username = session.user.username;

    if (session.user.dateOfBirth) personalDataObject.dateOfBirth = session.user.dateOfBirth;
    
    await db.collection("metadata").doc(session.user.id).set(metadataObject);
    await db.collection("home").doc(session.user.id).set(introObject);
    await db.collection("portfolio").doc(session.user.id).set({});
    await db.collection("projects").doc(session.user.id).set({});
    await db.collection("gallery").doc(session.user.id).set({ collection: [] });
    await db.collection("preferences").doc(session.user.id).set(personalDataObject);

    return redirect("/profile");
};

export default createProfile;