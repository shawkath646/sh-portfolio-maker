import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { ProjectItemType } from "@/types/types";

const getProjectItems = cache(async(userId: string) => {
    const projectsRef = await db.collection("projects").doc(userId).get();
    const projectItemsSnapshot = await projectsRef.ref.collection("projectItems").get();

    return projectItemsSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as ProjectItemType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
});

export default getProjectItems;