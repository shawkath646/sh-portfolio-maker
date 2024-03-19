import { cache } from "react";
import { db } from "@/config/firebase.config";
import { EducationType, PortfolioDataType, ReawardsType, VolunteeringType, WorkExperienceType } from "@/types/types";
import timeStampToDate from "@/utils/timeStampToDate";


const getPortfolioData = cache(async (userId: string): Promise<PortfolioDataType | null> => {
    const portfolioRef = await db.collection("portfolio").doc(userId).get();
    const educationSnapshot = await portfolioRef.ref.collection("education").get();
    const workExperienceSnapshot = await portfolioRef.ref.collection("workExperience").get();
    const volunteeringSnapshot = await portfolioRef.ref.collection("volunteering").get();
    const reawardsSnapshot = await portfolioRef.ref.collection("reawards").get();

    const education = educationSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as EducationType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
    const workExperience = workExperienceSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as WorkExperienceType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
    const volunteering = volunteeringSnapshot.docs.map(doc => {
        const { startsFrom, endsOn, ...rest } = doc.data() as VolunteeringType;
        return {
            ...rest,
            startsFrom: timeStampToDate(startsFrom),
            endsOn: endsOn && timeStampToDate(endsOn)
        };
    });
    const reawards = reawardsSnapshot.docs.map(doc => {
        const { issuedOn, ...rest } = doc.data() as ReawardsType;
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