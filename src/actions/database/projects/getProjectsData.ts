import { cache } from "react";
import { db } from "@/config/firebase.config";
import timeStampToDate from "@/utils/timeStampToDate";
import { ProjectsDataType } from "@/types/types";

const getProjectsData = cache(async(userId: string) => {
    const projectsRef = await db.collection("projects").doc(userId).get();
    const projectItemsSnapshot = await projectsRef.ref.collection("projectItems").get();

    return projectItemsSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as ProjectsDataType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
});

export default getProjectsData;