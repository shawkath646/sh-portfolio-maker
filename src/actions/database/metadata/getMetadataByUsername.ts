import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { MetaDataType, ViewersType } from "@/types/types";


const getMetadataByUsername = cache(async (username: string) => {
    const querySnapshot = await db.collection("metadata").where("username", "==", username).get();
    if (querySnapshot.empty) return null;
    const data = querySnapshot.docs[0].data() as MetaDataType;
    const viewersSnapshot = await querySnapshot.docs[0].ref.collection("viewers").get();
    data.viewers = viewersSnapshot.docs.map((doc) => {
        const viewersData = doc.data() as ViewersType;
        viewersData.firstViewedOn = timeStampToDate(viewersData.firstViewedOn);
        viewersData.lastViewedOn = timeStampToDate(viewersData.lastViewedOn);
        return viewersData;
    });
    data.joinedOn = timeStampToDate(data.joinedOn);
    return data;
});

export default getMetadataByUsername;