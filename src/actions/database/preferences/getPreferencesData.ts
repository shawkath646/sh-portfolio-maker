import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { PreferencesType } from "@/types/types";

const getPreferencesData = cache(async (userId: string) => {
    const preferencesRef = await db.collection("preferences").doc(userId).get();
    if (!preferencesRef.exists) return null;
    const data = preferencesRef.data() as PreferencesType;
    if (data.dateOfBirth) data.dateOfBirth = timeStampToDate(data.dateOfBirth);
    data.events.forEach(event => {
        if (event.timestamp) {
            event.timestamp = timeStampToDate(event.timestamp);
        }
    });
    return data;
});

export default getPreferencesData;