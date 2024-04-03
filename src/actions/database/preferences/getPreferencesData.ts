import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { EventItemType, PersonalDataType, PreferencesDataType } from "@/types/types";

const getPreferencesData = cache(async (userId: string): Promise<PreferencesDataType | null> => {
    const preferencesDoc = await db.collection("preferences").doc(userId).get();
    if (!preferencesDoc.exists) return null;
    const personalData = preferencesDoc.data() as PersonalDataType;
    if (personalData.dateOfBirth) personalData.dateOfBirth = timeStampToDate(personalData.dateOfBirth);
    const eventItemsSnapshot = await preferencesDoc.ref.collection("eventItems").get();

    const eventItems = eventItemsSnapshot.docs.map((doc) => {
        const eventItem = doc.data() as EventItemType;
        eventItem.timestamp = timeStampToDate(eventItem.timestamp);
        return eventItem;
    });

    return {
        personalData,
        eventItems
    }
});

export default getPreferencesData;