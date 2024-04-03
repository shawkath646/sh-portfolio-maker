import { cache } from "react";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { PartialBy, ViewerItemType } from "@/types/types";
import timeStampToDate from "@/utils/timeStampToDate";
import getMetadataById from "./getMetadataById";

const getViewers = cache(async() => {
    const session = await auth();
    if (!session?.user.id) return [];

    const viewerItems = await db.collection("metadata").doc(session.user.id).collection("viewers").orderBy("lastViewedOn", "desc").limit(20).get();
    const viewerItemsData = viewerItems.docs.map(async(doc) => {
        const data = doc.data() as PartialBy<PartialBy<ViewerItemType, "name">, "username">;
        data.firstViewedOn = timeStampToDate(data.firstViewedOn);
        data.lastViewedOn = timeStampToDate(data.lastViewedOn);

        const viewerMetadata = await getMetadataById(data.id);
        data.name = viewerMetadata ? (viewerMetadata?.firstName + " " + viewerMetadata?.lastName) : "Deleted user"
        data.username = viewerMetadata ? viewerMetadata.username : "deleted-user"
        return data as ViewerItemType;
    });

    return await Promise.all(viewerItemsData);
});

export default getViewers;