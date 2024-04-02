import { cache } from "react";
import { db } from "@/config/firebase.config";
import { EducationItemType, PortfolioDataType, ReawardAndAchievementItemType, VolunteeringItemType, WorkExperienceItemType } from "@/types/types";
import timeStampToDate from "@/utils/timeStampToDate";


const getPortfolioData = cache(async (userId: string): Promise<PortfolioDataType | null> => {
    const portfolioRef = await db.collection("portfolio").doc(userId).get();
    const educationSnapshot = await portfolioRef.ref.collection("educationItems").get();
    const workExperienceSnapshot = await portfolioRef.ref.collection("workExperienceItems").get();
    const volunteeringSnapshot = await portfolioRef.ref.collection("volunteeringItems").get();
    const reawardsSnapshot = await portfolioRef.ref.collection("reawardAndAchievementItems").get();

    const education = educationSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as EducationItemType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
    const workExperience = workExperienceSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as WorkExperienceItemType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
    const volunteering = volunteeringSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as VolunteeringItemType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
    const reawards = reawardsSnapshot.docs.map(doc => {
        const { issuedOn, ...rest } = doc.data() as ReawardAndAchievementItemType;
        return {
            ...rest,
            issuedOn: timeStampToDate(issuedOn),
        };
    });

    return {
        education,
        workExperience,
        volunteering,
        reawards
    };
});

export default getPortfolioData;