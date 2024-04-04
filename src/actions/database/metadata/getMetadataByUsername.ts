import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { MetaDataType } from "@/types/types";


const getMetadataByUsername = cache(async (username: string) => {
    const querySnapshot = await db.collection("metadata").where("username", "==", username).get();
    if (querySnapshot.empty) return null;
    const data = querySnapshot.docs[0].data() as MetaDataType;
    const viewersSnapshot = await querySnapshot.docs[0].ref.collection("viewers").get();
    data.viewers = viewersSnapshot.docs.length;
    data.joinedOn = timeStampToDate(data.joinedOn);
    return data;
});

export default getMetadataByUsername;