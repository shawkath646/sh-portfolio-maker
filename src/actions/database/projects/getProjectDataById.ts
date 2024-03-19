import { cache } from "react";
import { db } from "@/config/firebase.config";
import { ProjectsDataType } from "@/types/types";
import timeStampToDate from "@/utils/timeStampToDate";


const getProjectDataById = cache(async (userId: string, projectId: string) => {
    const docRef = await db.collection("projects").doc(userId).collection("projectItems").doc(projectId).get();
    if (!docRef.exists) return null;
    const data = docRef.data() as ProjectsDataType;
    data.startsFrom = timeStampToDate(data.startsFrom);
    if (data.endsOn) data.endsOn = timeStampToDate(data.endsOn);

    if (data.description) {
        const response = await fetch(data.description);
        if (response.ok) {
            const markdownContent = await response.text();
            data.description = markdownContent;
        }
    }
    return data;
});
export default getProjectDataById;