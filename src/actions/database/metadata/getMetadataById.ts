import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { MetaDataType } from "@/types/types";

const getMetadataById = cache(async (userId: string) => {
    const authorMetaDataRef = await db.collection('metadata').doc(userId).get();
    if (!authorMetaDataRef.exists) return null;
    const data = authorMetaDataRef.data() as MetaDataType;
    const viewersSnapshot = await authorMetaDataRef.ref.collection("viewers").get();
    data.viewers = viewersSnapshot.docs.length;
    data.joinedOn = timeStampToDate(data.joinedOn);
    return data;
});

export default getMetadataById;